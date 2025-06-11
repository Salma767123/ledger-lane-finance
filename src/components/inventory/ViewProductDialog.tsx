
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: string;
}

interface ViewProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewProductDialog = ({ product, open, onOpenChange }: ViewProductDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Product Name</h4>
              <p className="text-gray-600">{product.name}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">SKU</h4>
              <p className="text-gray-600">{product.sku}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Category</h4>
              <p className="text-gray-600">{product.category}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Stock Quantity</h4>
              <p className="text-gray-600">{product.stock}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Price</h4>
              <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Status</h4>
              <Badge variant={
                product.status === 'In Stock' ? 'default' :
                product.status === 'Low Stock' ? 'secondary' : 'destructive'
              }>
                {product.status}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
