"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";

type Provider = {
  id: string;
  name: string;
  type: string;
  signInUrl?: string;
  callbackUrl: string;
  signInUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const Auth = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  // if (providers) {
  //   return (
  // <div>
  //   {Object.values(providers).map((provider: Provider, i) => (
  //     <button key={i} onClick={() => signIn(provider?.id)}>
  //       {provider.id}
  //     </button>
  //   ))}
  // </div>
  //   );
  // }

  return (
    <div className="flex items-center justify-between">
      <p>Login to save your work</p>
      {providers && (
        <>
          <div>
            {Object.values(providers).map((provider: Provider, i) => (
              <button
                key={i}
                className="justify-center mx-2 text-center"
                onClick={() => signIn(provider?.id)}
              >
                {provider.id === "google" ? <BsGoogle /> : <FiGithub />}
              </button>
            ))}
          </div>
        </>
      )}
      {/* <Button variant="default" asChild>
        <Link href={"/login"}>Login</Link>
      </Button> */}
    </div>
  );
};

export default Auth;
