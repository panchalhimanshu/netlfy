import React from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';

const staffImportModal = () => {
  return (
    <>
      <Dialog >
        <DialogTrigger asChild>
          <Button color="success" className="shadow-md pr-2"> <Download size={20} className='pr-1' />Import</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium text-xl text-blue-950 ">
              <div className='border-b-2 border-b-slate-300 border-spacing-1'>

              Import from Excel
              </div>
            </DialogTitle>
              {/* <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700">
                </hr> */}
            
          </DialogHeader>
          <DialogDescription>
              Imported products are distinguished by SKU. If the SKU already exists, then its corresponding product will be updated.
              Import requires a lot of memory resources. That's why it's not recommended to import more than 500 - 1,000 records at once. If you have more records, it's better to split them to multiple Excel files and import separately.
              <div>
                <span>Excel File</span>
              </div>
            </DialogDescription>
          
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              {/* <Button type="submit" variant="outline">
                Disagree
              </Button> */}
            </DialogClose>
            <Button className="bg-blue-950" type="submit">Import from Excel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default staffImportModal;