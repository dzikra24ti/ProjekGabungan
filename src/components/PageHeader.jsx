import { AiOutlineShoppingCart } from "react-icons/ai"; 
export default function PageHeader({title}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-extrabold flex items-center gap-2">
         {title}
      </h2>
    </div>
  );
}