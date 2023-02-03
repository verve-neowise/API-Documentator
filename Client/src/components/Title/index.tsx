import { ChildrenProps } from "../../models/Props";

export default ({ children }: ChildrenProps) => {
   return (
     <h1 className="text-3xl font-bold my-6"> {children} </h1>
   )
}