"use client"

import { DollarSign } from "lucide-react"
import DataCard from "~/components/DataCard"

const AdminPage = () => {
  return (
    <main className="container pt-4">
        <div className="grid grid-cols-3">
            <DataCard Icon={DollarSign} description="" title="Total Revenue" value={(540053).toLocaleString("en-US")} />
        </div>
    </main>
  )
}

export default AdminPage

