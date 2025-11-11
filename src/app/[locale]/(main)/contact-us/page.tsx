"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import {
  headerContainerVariants,
  headerVariants,
  cardVariants,
  viewportHeader,
  viewportOnce,
} from "../../../../utils/animations";

export default function ContactUsPage() {
  const t = useTranslations("common.contactPage");
  return (
    <main className="w-full min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportHeader}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            variants={headerVariants}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={headerVariants}
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t("form.title")}
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("form.name")}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t("form.namePlaceholder")}
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("form.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("form.subject")}
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder={t("form.subjectPlaceholder")}
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder={t("form.messagePlaceholder")}
                  className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
                />
              </div>
              <Button size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                {t("form.submit")}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6"
          >
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t("info.title")}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t("info.email")}
                    </h3>
                    <p className="text-muted-foreground">
                      support@boostify.com
                    </p>
                    <p className="text-muted-foreground">sales@boostify.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t("info.phone")}
                    </h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">
                      Mon-Fri, 9am-5pm EST
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t("info.address")}
                    </h3>
                    <p className="text-muted-foreground">
                      123 Business Street
                      <br />
                      Suite 100
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <h3 className="font-semibold text-foreground mb-3">
                {t("info.businessHours")}
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>{t("info.mondayFriday")}</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("info.saturday")}</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("info.sunday")}</span>
                  <span>{t("info.closed")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
