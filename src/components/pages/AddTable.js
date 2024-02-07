import { useContext } from "react"
import restaurantContext from "../../contextApi/restaurantContext"


export default function AddTable() {
  const { restaurantState } = useContext(restaurantContext)
  console.log(restaurantState, "resofy")

  return (
    <div>
        <h2>Add table</h2>
    </div>
  )
}