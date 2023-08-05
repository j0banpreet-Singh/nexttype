import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constant";

const Footer = () => {
  type ColumnProps = {
    title: string;
    links: Array<string>;
  };
  const FooterColumn = ({ title, links }: ColumnProps) => (
    <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <Link href="/" key={link}>{link}</Link>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex flex-col items-start">
          {/* <Image src="/logo-purple.svg" alt="" width={103} height={43} /> */}
          <h2 className="text-2xl font-extrabold">𝟦𝟢𝟦 𝐹𝒾𝓍𝑒𝓇𝓈</h2>

          <p className="text-start text-sm font-normal mt-5 max-w-xs">
          𝟦𝟢𝟦 𝐹𝒾𝓍𝑒𝓇𝓈 is for the developers by the developers.
            <br></br>
            Share your best projects on 𝟦𝟢𝟦 𝐹𝒾𝓍𝑒𝓇𝓈
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
            <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links}/>

            <div className="flex flex-col flex-1 gap-4">
                <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
                <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
            </div>

            <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links}/>

            <div className="flex flex-col flex-1 gap-4">
                <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
                <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
            </div>

            <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links}/>
        </div>
        <div className="flexBetween footer_copyright">
            <p>@ 2023 𝟦𝟢𝟦 𝐹𝒾𝓍𝑒𝓇𝓈. All rights reserved</p>
            <p>
                <span className="text-black font-semibold">10,200</span> projects submitted
            </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
