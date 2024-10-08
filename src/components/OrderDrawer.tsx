import React from "react";
import { Order } from "~/server/db/schema";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { ScrollArea } from '~/components/ui/scroll-area'
import { AsyncImage } from "loadable-image";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const OrderDrawer = ({
  order,
  isOpen,
  setOpen,
  setOrder,
}: {
  order: Order | null;
  isOpen: boolean;
  setOpen: (b: boolean) => void;
  setOrder: (order: Order | null) => void;
}) => {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setOpen}
      onClose={() => {
        setTimeout(() => {
          setOrder(null);
        }, 600);
      }}
    >
      {order && (
        <DrawerContent className="h-[calc(100vh-100px)]">
          <DrawerHeader>
            <DrawerTitle>{order.title}</DrawerTitle>
          </DrawerHeader>

          <ScrollArea>
          <div className="flex flex-col items-center justify-center gap-2 pt-6 sm:flex-row sm:items-start sm:gap-10 sm:px-5">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {order?.images?.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <AsyncImage
                        className="aspect-[9/12] h-auto w-full rounded-xl"
                        src={img.url || ""}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {order.images && order.images?.length < 0 && <CarouselPrevious />}
              {order.images && order.images?.length < 0 && <CarouselNext />}
            </Carousel>

            <div className="grid w-full max-w-sm gap-2 pt-2">
              <div>
                <Label>Extra detaljer:</Label>
                <Textarea
                  disabled
                  defaultValue={order.extra_details || ""}
                ></Textarea>
              </div>

              <div>
                <Label>Bakgrundfärg</Label>
                <Input disabled value={order.background || ""} />
              </div>

              <div>
                <Label>Textfärg</Label>
                <Input disabled value={order.text_color || ""} />
              </div>

              <div className="grid gap-2 pt-2">
                <Label>Information av köpare:</Label>

                <div className="grid gap-2">
                  <div>
                    <Label>Telefonnummer</Label>
                    <Input
                      type="number"
                      disabled
                      value={order.phone_number || ""}
                    />
                  </div>
                  <div>
                    <Label>E-post</Label>
                    <Input type="email" disabled value={order.email || ""} />
                  </div>
                </div>
              </div>

              <div>
                <Label>Pris</Label>
                <Input type="number" disabled value={order.price || ""}/>
              </div>
            </div>
          </div>
          </ScrollArea>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  );
};

export default OrderDrawer;
