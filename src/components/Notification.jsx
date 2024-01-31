import { useNotifyValue } from "../NotifyContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationValue = useNotifyValue()
  
  if (!notificationValue) return null

  return (
    <div style={style}>
      {notificationValue}
    </div>
  )
}

export default Notification
