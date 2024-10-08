"use client"

import { CreditCard, DollarSign } from "lucide-react"
import React from "react"
import { useEffect, useState } from "react"
import DataCard, { LoadingDataCard } from "~/components/DataCard"
import OrderDrawer from "~/components/OrderDrawer"
import { columns } from "~/components/orderTable/columns"
import { OrderTable } from "~/components/orderTable/OrderTable"
import { Order } from "~/server/db/schema"
import { api } from "~/trpc/react"

const AdminPage = () => {

    const { data: orders, isLoading } = api.order.getOrders.useQuery();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalSales, setTotalSales] = useState<number>(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [order, setOrder] = useState<Order | null>(null)

    const calcAmounts = () => {
        let totalPrices = 0;
        let totalSales = 0;
        if(orders && orders.length > 0) {
            for (let i = 0; i < orders.length; ++i) {
                totalPrices += Number(orders[i]?.price);
                totalSales++;
            }
        }
        setTotalPrice(totalPrices)
        setTotalSales(totalSales)
    }

    useEffect(() => {
        if(orders && orders.length > 0) {
            calcAmounts()
        }
    }, [orders])

    useEffect(() => {
        if(order) {
            setDrawerOpen(true)
        }
    }, [order])


  return (
    <main className="container pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

            {isLoading ? (
               (
                <>
                 <LoadingDataCard />
                 <LoadingDataCard />
                 </>
               )
            ) : (
                <>
                <DataCard Icon={DollarSign} description="" title="Totala intäkter" value={(totalPrice).toLocaleString("se-SV", { style: "currency", currency: "SEK" })} />
                <DataCard Icon={CreditCard} description="" title="Försäljningar" value={(totalSales).toLocaleString("se-SV")} />
                </>
            )}
        </div>

        <div className="pt-6">
            {orders && !isLoading ? (
                <OrderTable setOrder={setOrder} columns={columns} data={orders} />
            ) : null}
        </div>

        <OrderDrawer setOrder={setOrder} setOpen={setDrawerOpen} isOpen={drawerOpen} order={order} />
    </main>
  )
}

export default AdminPage

