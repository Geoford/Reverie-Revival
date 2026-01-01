import { prisma } from "@/lib/prisma";
import { Badge } from "@/app/admin/(app)/_components/ui/Badge";
import { Table, THead, TBody, TR, TH, TD } from "@/app/admin/(app)/_components/ui/Table";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!prisma) {
    return (
      <div className="text-white/70">
        Prisma is not configured. Set DATABASE_URL to continue.
      </div>
    );
  }

  const since = new Date();
  since.setDate(since.getDate() - 7);

  const [revenueAgg, ordersCount, pendingCount, recentOrders, variants] =
    await Promise.all([
      prisma.order.aggregate({
        where: { createdAt: { gte: since }, paymentStatus: "PAID" },
        _sum: { total: true },
      }),
      prisma.order.count({ where: { createdAt: { gte: since } } }),
      prisma.order.count({
        where: { fulfillmentStatus: { in: ["UNFULFILLED", "PROCESSING"] } },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          orderNumber: true,
          email: true,
          total: true,
          paymentStatus: true,
          fulfillmentStatus: true,
          createdAt: true,
        },
      }),
      prisma.variant.findMany({
        where: { isActive: true },
        include: { product: true },
      }),
    ]);

  const lowStockVariants = variants.filter(
    (variant) => variant.stockQty <= variant.lowStockThreshold
  );

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="text-2xl tracking-[0.2em]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          DASHBOARD
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Operational overview for the last 7 days.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs tracking-[0.3em] text-white/50">REVENUE (7D)</p>
          <p className="mt-3 text-2xl">
            {formatCurrency(revenueAgg._sum.total ?? 0)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs tracking-[0.3em] text-white/50">ORDERS (7D)</p>
          <p className="mt-3 text-2xl">{ordersCount}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs tracking-[0.3em] text-white/50">
            PENDING FULFILLMENT
          </p>
          <p className="mt-3 text-2xl">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs tracking-[0.3em] text-white/50">
            LOW STOCK VARIANTS
          </p>
          <p className="mt-3 text-2xl">{lowStockVariants.length}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-[#121214]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h2 className="text-sm tracking-[0.2em]">RECENT ORDERS</h2>
          </div>
          <Table>
            <THead>
              <TR>
                <TH>Order</TH>
                <TH>Customer</TH>
                <TH>Total</TH>
                <TH>Payment</TH>
                <TH>Fulfillment</TH>
                <TH>Date</TH>
              </TR>
            </THead>
            <TBody>
              {recentOrders.map((order) => (
                <TR key={order.id}>
                  <TD className="font-medium">#{order.orderNumber}</TD>
                  <TD>{order.email}</TD>
                  <TD>{formatCurrency(order.total)}</TD>
                  <TD>
                    <Badge
                      tone={order.paymentStatus === "PAID" ? "success" : "warning"}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TD>
                  <TD>
                    <Badge
                      tone={
                        order.fulfillmentStatus === "DELIVERED"
                          ? "success"
                          : order.fulfillmentStatus === "CANCELLED"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {order.fulfillmentStatus}
                    </Badge>
                  </TD>
                  <TD>
                    {order.createdAt.toLocaleDateString("en-PH", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TD>
                </TR>
              ))}
              {recentOrders.length === 0 && (
                <TR>
                  <TD colSpan={6} className="py-6 text-center text-white/40">
                    No recent orders.
                  </TD>
                </TR>
              )}
            </TBody>
          </Table>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#121214]">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm tracking-[0.2em]">LOW STOCK</h2>
          </div>
          <div className="space-y-4 px-5 py-4">
            {lowStockVariants.slice(0, 8).map((variant) => (
              <div key={variant.id} className="border-b border-white/5 pb-4">
                <p className="text-sm">{variant.product.title}</p>
                <p className="text-xs text-white/60">
                  {variant.size} / {variant.color} - {variant.sku}
                </p>
                <p className="mt-1 text-xs text-[#E10613]">
                  {variant.stockQty} left (threshold {variant.lowStockThreshold})
                </p>
              </div>
            ))}
            {lowStockVariants.length === 0 && (
              <p className="text-sm text-white/50">
                No low-stock variants right now.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
