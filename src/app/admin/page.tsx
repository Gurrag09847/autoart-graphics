"use client"

import { DollarSign } from "lucide-react"
import DataCard from "~/components/DataCard"
import { api } from "~/trpc/react"

const AdminPage = () => {

    const { data: orders, isLoading } = api.order.getOrders.useQuery();

  return (
    <main className="container pt-4">
        <div className="grid grid-cols-3 gap-2">
            {/*<DataCard Icon={DollarSign} description="" title="Totala intäkter" value={(540053).toLocaleString("se-SV", { style: "currency", currency: "SEK" })} />
            <DataCard Icon={DollarSign} description="" title="Försäljningar" value={(1).toLocaleString("se-SV")} />*/}
        </div>

        <div>
            {orders && JSON.stringify(orders)}
        </div>
    </main>
  )
}

export default AdminPage

