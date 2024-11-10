interface OrderDetailProps {
  title: string;
  detail: string;
}

export default function OrderDetails({ title, detail }: OrderDetailProps) {
  return (
    <div>
      <p>{title}</p>
      <p>{detail}</p>
    </div>
  )
}