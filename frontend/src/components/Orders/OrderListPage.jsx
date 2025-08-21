import OrderTable from './OrderTable';
export default function CreateOrder() 
{
  return (
    <>
      <OrderTable onCreated={() => window.location.reload()} />
    </>
  );
}