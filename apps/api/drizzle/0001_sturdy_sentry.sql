ALTER TABLE "products" ADD COLUMN "height" real;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "length" real;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "thickness" real;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "additional_info" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "material" varchar(100);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "color" jsonb;