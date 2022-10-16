import { useRouter } from "next/router";

type Props = {
  id: string;
};

// export const getServerSideProps = async (context) => {
//   const { id } = context.query;
//   console.log(id);
//   return {
//     props: {
//       id,
//     },
//   };
// };

export default function Locker(props: Props) {
  // use router
  const router = useRouter();
  const { id } = router.query;

  // const id
  // console.log("props", props);
  return (
    <div>
      <h1>Locker</h1>
      <p>Locker ID: {id}</p>
    </div>
  );
}
