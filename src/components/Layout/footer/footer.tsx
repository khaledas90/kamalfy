"use client"

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export function Footer() {
  const t = useTranslations("common.footer")
  
  const footerSections = {
    product: {
      title: t("sections.product.title"),
      links: [
        { label: t("sections.product.links.features"), href: "/features" },
        { label: t("sections.product.links.pricing"), href: "/pricing" },
        { label: t("sections.product.links.demo"), href: "#" },
        { label: t("sections.product.links.integrations"), href: "#" },
      ],
    },
    company: {
      title: t("sections.company.title"),
      links: [
        { label: t("sections.company.links.about"), href: "/about-us" },
        { label: t("sections.company.links.blog"), href: "#" },
        { label: t("sections.company.links.careers"), href: "#" },
        { label: t("sections.company.links.contact"), href: "/contact-us" },
      ],
    },
    resources: {
      title: t("sections.resources.title"),
      links: [
        { label: t("sections.resources.links.documentation"), href: "#" },
        { label: t("sections.resources.links.support"), href: "#" },
        { label: t("sections.resources.links.privacy"), href: "#" },
        { label: t("sections.resources.links.terms"), href: "#" },
      ],
    },
  }

  const socials = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  return (
    <footer className="bg-foreground text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Column 1: Branding */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-xl font-bold">Kamalfy</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("description")}
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {socials.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Column 2-4: Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold mb-6 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
