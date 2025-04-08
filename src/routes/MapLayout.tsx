import { Outlet } from "react-router-dom"
import { MapView } from "../components/MapView"

const MapLayout = () => {
  return (
    <div>
      <MapView />
      <Outlet />
    </div>
  )
}

export default MapLayout
