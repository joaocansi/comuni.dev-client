import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import Link from "next/link";

import { GithubIcon } from "@/src/shared/components/icons";

export function SocialMediaTab() {
  return (
    <div className="mt-4">
      <h4 className="mb-2 text-lg">Redes Sociais</h4>
      <Divider />
      <div className="flex flex-col gap-10 justify-center items-center pt-20">
        <Link href="/">
          <div className="flex gap-2 items-center">
            <Image src="/discord.svg" width={32} />
            <h6 className="text-xl font-bold">Discord</h6>
          </div>
        </Link>
        <div className="flex gap-2 items-center">
          <GithubIcon size={32} />
          <h6 className="text-xl font-bold">Github</h6>
        </div>
        <div className="flex gap-2">
          <h6>Instagram</h6>
        </div>
        <div className="flex gap-2">
          <h6>Twitter</h6>
        </div>
        <div className="flex gap-2">
          <h6>Reddit</h6>
        </div>
      </div>
    </div>
  );
}
