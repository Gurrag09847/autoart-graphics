"use client"

import { Cloud, File, Image, X } from 'lucide-react'
import Dropzone from 'react-dropzone'
import { useToast } from '~/hooks/use-toast'
import { Progress } from './ui/progress';

export default function UploadButton({ setImages, images, uploadProgres }: { images: File[], setImages: (images: File[]) => void, uploadProgres: number }) {

  const { toast } = useToast();

  const removeImage = (index: number) => {
    console.log(index)
    const oldImages = [...images]
    if (index > -1) {
      oldImages.splice(index, 1);
    }
    setImages(oldImages)
  }


  return (
    <Dropzone
      multiple={true}
      accept={{
        "image/*": [""]
      }}
      onDropAccepted={(acceptedFiles) => {
        console.log(acceptedFiles)
        const oldImages = [...images]
        const newImages = [...oldImages].concat(acceptedFiles)
        setImages(newImages)
      }}
      onDropRejected={(fileRejections) => {
        toast({
          title: "Hoppsan, någonting gick fel...",
          description: "Ladda bara upp bildfiler",
          variant: "destructive",
        })
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          onClick={(e) => e.stopPropagation()}
          className='border min-h-64 border-dashed border-gray-300 rounded-lg'>
          <div className='flex items-center justify-center h-full w-full'>
            
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                {uploadProgres <= 0 ? <><Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                <p className='mb-2 text-sm text-zinc-700'>
                  <span className='font-semibold'>
                    Klicka för att ladda upp
                  </span>{' '}
                  eller drag och släpp
                </p> </>: (
                   <Progress value={uploadProgres} className='min-w-40 w-full h-2' />
                )}
                {/* <p className='text-xs text-zinc-500'>
                    PDF (up to {isSubscribed ? "16" : "4"}MB)
                  </p> */}
              </div>

              <div className='max-w-xs grid gap-2' style={{
                paddingBottom: images.length > 0 ? 20 : 0
              }}>
               
                {images && images.map((file, i) => (
                  // <div className='w-full bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                  //   <div className='px-3 py-2 h-full grid place-items-center'>
                  //     <Image className='h-4 w-4 text-blue-500' />
                  //   </div>
                  //   <div className='px-3 w-full items-center py-2 h-full text-sm flex justify-between'>
                  //     <p className='truncate w-full'>
                  //       {file.name}
                  //     </p>
                  //     <X className='h-4 w-4 text-red-500' />
                  //   </div>

                  // </div>
                  <div key={i} className='w-full min-w-[235px] relative bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                    <div className='px-3 py-2 h-full grid place-items-center'>
                      <Image className='h-4 w-4 text-blue-500' />
                    </div>
                    <div className='px-3 w-full items-center py-2 h-full text-sm flex justify-between'>
                      <p className='truncate flex-1'>
                        {file.name}
                      </p>
                    </div>
                    <div className='absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer bg-white w-9 h-full flex justify-center items-center'>
                      <div className='p-1 rounded-full hover:bg-muted transition-colors' onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeImage(i)
                      }}>
                        <X className='h-4 w-4' />
                      </div>
                    </div>
                  </div>

                ))}
              </div>

              {/* {isUploading ? (
                  <div className='w-full mt-4 max-w-xs mx-auto'>
                    <Progress
                      indicatorColor={
                        uploadProgress === 100
                          ? 'bg-green-500'
                          : ''
                      }
                      
                      value={uploadProgress}
                      className='h-1 w-full bg-zinc-200'
                    />
                    {uploadProgress === 100 ? (
                      <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                        <Loader2 className='h-3 w-3 animate-spin' />
                        Redirecting...
                      </div>
                    ) : null}
                  </div>
                ) : null} */}

              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
                accept='image/*'
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  )
}