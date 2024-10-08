"use client"


import { ColumnDef } from "@tanstack/react-table"
import { Order } from "~/server/db/schema"
import { AsyncImage } from 'loadable-image'
import { Image } from "types"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "E-post",
  },
  {
    accessorKey: "phone_number",
    header: "Telefonnummer",
  },
  {
    accessorKey: "background",
    header: "Bakgrundsfärg"
  },
  {
    accessorKey: "text_color",
    header: "Textfärg",
  },
  {
    accessorKey: "extra_details",
    header: "Detaljer",
    cell: ({ cell, row }) => {
        return <div className="max-w-8 w-full truncate">
            <span className="truncate w-full">{cell.getValue() as string}</span>
        </div>
    }
  },
  {
    accessorKey: "images",
    header: "Bilder",
    cell: ({ row, cell }) => {
        const nImages: Image[] = cell.getValue() as Image[]
        return <AsyncImage src={nImages[0]?.url || ""} className="aspect-square w-12 rounded-lg" />
    }
  },
  {
    accessorKey: "price",
    header: "Pris",
    cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("se-SV", {
          style: "currency",
          currency: "SEK",
        }).format(amount)
   
        return <span className="text-right font-medium">{formatted}</span>
      },
  },
]
