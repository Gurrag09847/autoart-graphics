import { Ellipsis, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner"
import { useState } from "react";
import { useRouter } from "next/navigation";


const DeleteOrder = ({ orderId } : { orderId: string }) => {
    const [open, setOpen] = useState(false);
    const { mutate } = api.order.deleteOrder.useMutation()
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const deletingOrder = async () => {
        mutate({ orderId: orderId })
    }

    const deleteOrder = async () => {
        try {
            setIsLoading(true);


            toast.promise(
                deletingOrder,
                {
                    loading: "Raderar order...",
                    success: () => 'Raderade order',
                    error: () => 'Kunde inte radera order'
                }
            );
        
            setIsLoading(false)
            setOpen(false)
            // await utils.order.invalidate()
            router.replace("/admin")
        } catch(err) {
            setIsLoading(false)
            toast.error('Ett fel uppstod vid radering av ordern')
        } 
        
    }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full p-2 hover:bg-muted">
            <Ellipsis className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Aktioner</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
          <DropdownMenuItem
            
          >
            <p className="text-destructive">Radera Order</p>
          </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du verkligen säker?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avsluta</AlertDialogCancel>
          <Button disabled={isLoading} variant={'destructive'} onClick={() => deleteOrder()}>
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Radera</span>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrder;
