import React from "react";
import Image from "next/image";
import { NavLinks } from "@/constant";
import Button from "./Button";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <div>
      <nav className="flexBetween navbar">
        <div className="flexStart flex-1 gap-10">
          <Link href={"/"}>
          <h3 className="text-4xl font-extrabold">𝟦𝟢𝟦 𝐹𝒾𝓍𝑒𝓇𝓈</h3>
          </Link>
          {/* <Image src="/logo.svg" width={116} height={43} alt="" /> */}
          <ul className="xl:flex hidden text-sm gap-7">
            {NavLinks.map((item) => (
              <Link href={item.href} key={item.key}>
                {item.text}
              </Link>
            ))}
          </ul>
        </div>
        <div className="flexCenter gap-4">
          {session?.user ? (
            <>
              <ProfileMenu session={session} />
              <Link href="/create-project">
                <Button title="Share Work +" bgColor="bg-black-100" />
              </Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
