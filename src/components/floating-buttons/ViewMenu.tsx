import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ViewMenu = ({}) => {
  return (
    <Button
      asChild
      className="z-50 flex aspect-square h-24 flex-col items-center justify-center rounded-full bg-[#1D1D1D] px-0 py-0 text-center text-xs uppercase text-black hover:bg-[#1D1D1D]"
    >
      <Link className="text-[#8F8F8F]" href="/table-booking">
        <Icons.dining color="#8F8F8F" />
        <span className="text-[#8F8F8F]">
          {" "}
          Table
          <br />
          Booking
        </span>
      </Link>
    </Button>
  );
};

export default ViewMenu;
