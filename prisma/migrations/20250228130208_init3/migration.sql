-- CreateTable
CREATE TABLE "series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "overview" TEXT,
    "status" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "backdrop" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "fldId" TEXT NOT NULL,
    "tmdbId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "season" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "episodeCount" INTEGER NOT NULL,
    "fldId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seriesId" INTEGER NOT NULL,

    CONSTRAINT "season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "episodeNumber" INTEGER NOT NULL,
    "fileID" TEXT NOT NULL,
    "hslUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "episode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "series_slug_idx" ON "series"("slug");

-- CreateIndex
CREATE INDEX "series_title_idx" ON "series"("title");

-- CreateIndex
CREATE INDEX "season_title_idx" ON "season"("title");

-- CreateIndex
CREATE INDEX "season_episodeCount_idx" ON "season"("episodeCount");

-- CreateIndex
CREATE INDEX "episode_title_idx" ON "episode"("title");

-- CreateIndex
CREATE INDEX "episode_hslUrl_idx" ON "episode"("hslUrl");

-- CreateIndex
CREATE INDEX "episode_episodeNumber_idx" ON "episode"("episodeNumber");

-- AddForeignKey
ALTER TABLE "season" ADD CONSTRAINT "season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
