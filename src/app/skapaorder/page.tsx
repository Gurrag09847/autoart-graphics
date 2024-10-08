"use client"

import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import UploadButton from "~/components/UploadButton"
import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { BASE_PRICE, IMAGE_PRICE } from "~/lib/constants"
import { orderSchema } from "~/lib/schemas/order"
import { CreateOrder } from "../actions/order"
import { useToast } from "~/hooks/use-toast"
import { z } from "zod"
import { uploadFiles, useUploadThing } from "~/utils/uploadthing"
import { Image } from "types"
import { useRouter, useSearchParams } from "next/navigation"

export default function OrderPage() {

    const [price, setPrice] = useState(BASE_PRICE)
    const [images, setImages] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0);
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    const done = searchParams.get("done")

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onUploadProgress(p) {
            setProgress(p)
        },
    })

    const onSubmit = async (values: z.infer<typeof orderSchema>) => {
        if (images.length <= 0) {
            toast({
                title: "Hoppsan, någonting gick fel...",
                description: "Du måste minst ha en bild",
                variant: "destructive",

            })
            return
        }
        setLoading(true)
        try {
            const uploadedImages = await startUpload(images)

            const nImages: Image[] = uploadedImages?.map(img => {
                return {
                    key: img.key,
                    url: img.url
                } satisfies Image
            }) as Image[]

            await CreateOrder(values, nImages)
            setLoading(false)

            router.push("/skapaorder?done=true")
        } catch (err) {
            toast({
                title: "Hoppsan, någonting gick fel...",
                description: "Testa att placera ordern igen",
                variant: "destructive",

            })
            setLoading(false)
        }
        setLoading(false)

    }

    useEffect(() => {
        calcPrice()
    }, [images])

    const calcImagePrice = () => {
        if (images && images?.length === 0) return 0
        const newImages = images.slice()
        return ((newImages.length || 1) * IMAGE_PRICE)- IMAGE_PRICE
    }

    const calcPrice = () => {
        const newPrice = BASE_PRICE + calcImagePrice()
        setPrice(newPrice)
    }


    if (done && (done === "true")) {
        return <main className="w-full container h-[calc(100vh-200px)] flex flex-col justify-center items-center pt-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full flex items-center justify-center flex-col text-center">
                <h2 className="scroll-m-20 pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
                    Tack för din beställning!
                </h2>
                <p className="text-base sm:text-lg">
                    Din order har skapats och vi arbetar nu med att behandla den. Du kommer att få ett e-postmeddelande när din affisch är klar för betalning och leverans. Håll utkik för att få din nya, snygga affisch snart! 🤩
                </p>
            </div>
        </main>

    }

    return (
        <main className="w-full container flex justify-center items-center pt-6">
            <div>

            </div>
            <div className="max-w-lg w-full flex justify-center">
                <AutoForm onSubmit={onSubmit} className="max-w-lg" formSchema={orderSchema}
                    onValuesChange={calcPrice}
                    fieldConfig={{
                        title: {
                            label: "Titel på affischen",
                            inputProps: {
                                placeholder: "Ex. Derbi Senda",
                            }
                        },
                        details: {
                            label: "Extra detaljer",
                            fieldType: "textarea",
                            inputProps: {
                                placeholder: "Ex. Jag vill att all text ska vara längst ner."
                            }
                        },
                        background: {
                            label: "Bakgrundsfärg"
                        },

                        text_color: {
                            label: "Textfärg"
                        },
                        email: {
                            label: "Din e-post",
                            inputProps: {
                                type: "email"
                            }
                        },
                        phone_number: {
                            label: "Ditt telefonnummer",
                            inputProps: {
                                type: "tel"
                            },
                            fieldType: "number"
                        }
                    }}
                >

                    <div className="grid gap-3">
                        <Label>Bilder <span className="text-muted-foreground">(+{IMAGE_PRICE}kr för varje bild utoma 1:a)</span></Label>
                        <UploadButton uploadProgres={progress} setImages={setImages} images={images} />
                    </div>

                    <div className="grid">
                        <p>Pris: {price}kr</p>
                        {/* <p>Moms: {(price * 0.02).toLocaleString()}kr</p> */}
                    </div>
                    <div className="grid sm:flex sm:justify-end">
                        <Button type="submit" className="min-w-[122px]" disabled={loading || isUploading}>{loading || isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Placera order</span>}</Button>
                    </div>
                </AutoForm>
            </div>
        </main>
    )
}