-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('posted', 'draft');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'image', 'link');

-- CreateTable
CREATE TABLE "posts" (
    "post_id" SERIAL NOT NULL,
    "author_id" TEXT NOT NULL DEFAULT '',
    "orig_author_id" TEXT NOT NULL DEFAULT '',
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posted_date" TIMESTAMP(3) NOT NULL,
    "likes_qty" INTEGER NOT NULL DEFAULT 0,
    "comments_qty" INTEGER NOT NULL DEFAULT 0,
    "type" "PostType" NOT NULL,
    "status" "PostStatus" NOT NULL,
    "is_reposted" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "title" TEXT,
    "announcement" TEXT,
    "text" TEXT,
    "image_link" TEXT,
    "video_link" TEXT,
    "link" TEXT,
    "description" TEXT,
    "quote" TEXT,
    "quote_author" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "author_id" TEXT NOT NULL DEFAULT '',
    "post_id" INTEGER NOT NULL,
    "posted_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
