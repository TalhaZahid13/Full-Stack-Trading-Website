import OrderScreen from './CreateOrder';
export default function OrderListPage() 
{
  return (
    <>
      <OrderScreen onCreated={() => window.location.reload()} />
    </>
  );
}