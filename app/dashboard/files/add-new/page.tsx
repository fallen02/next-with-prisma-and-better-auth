"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import axios from 'axios'
import {
  createFilemoonFolder,
  // createFolder,
  getSeriesSeasonData,
  getTMDBData,
  // getUploadServer,
} from "@/lib/functions";
import { toast } from "sonner";
import { EpisodeType, SeriesDataType } from "@/lib/types";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
// import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown, UploadIcon } from "lucide-react";
// import { set } from "zod";

export default function AddNew() {
  const [openPopover, setOpenPopover] = React.useState(true);
  const [tmdbId, setTmdbId] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState<SeriesDataType | null>(null);
  const [seasonData, setSeasonData] = React.useState<EpisodeType[] | null>(
    null
  );

  const [openSeason, setOpenSeason] = React.useState<boolean>(false);
  const [selectedSeason, setSelectedSeason] = React.useState<number>(0);
  const [seasonLoading, setSeasonLoading] = React.useState(false);

  const [openEpisode, setOpenEpisode] = React.useState<boolean>(false);
  const [selectedEpisode, setSelectedEpisode] = React.useState<number>(0);
  const [selectedEpisodeData, setSelectedEpisodeData] =
    React.useState<EpisodeType | null>(null);

  const getSeriesData = async () => {
    setLoading(true);
    const res = await getTMDBData(tmdbId);
    if (!res) {
      toast.error("Series not found");
      setLoading(false);
      return;
    }
    setData({ ...res });
    toast.success("Series found");
    // console.log(data);
    setLoading(false);
    setOpenPopover(false);
  };

  // const handleSeasonChange = async (currentValue: string) => {
  //   setSelectedSeason(
  //     currentValue === selectedSeason.toString()
  //       ? 0
  //       : Number(currentValue)
  //   );
  //   toast.success(`Season ${currentValue} selected`);
  //   setOpenSeason(false);
  //   try {
  //     const res = await getSeriesSeasonData(tmdbId, selectedSeason);
  //     if (res) {
  //       setSeasonData(res);
  //       toast.success(`Season ${selectedSeason} data loaded`);
  //     } else {
  //       toast.error("Failed to load season data");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error loading season data");
  //   } finally {
  //     setSeasonLoading(false);
  //   }
  // };

  const handleSeasonChange = async (currentValue: string) => {
    // Calculate new season number
    const newSeasonNumber =
      currentValue === selectedSeason.toString() ? 0 : Number(currentValue);

    // Update state
    setSelectedSeason(newSeasonNumber);
    setOpenSeason(false);

    // Don't fetch if season is deselected
    if (newSeasonNumber === 0) {
      setSeasonData(null);
      return;
    }

    // Show loading state
    setSeasonLoading(true);
    toast.success(`Season ${currentValue} selected`);

    try {
      // Use newSeasonNumber instead of selectedSeason
      const res = await getSeriesSeasonData(tmdbId, newSeasonNumber);
      if (res) {
        setSeasonData(res);
        toast.success(`Season ${newSeasonNumber} data loaded`);
      } else {
        toast.error("Failed to load season data");
        setSeasonData(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading season data");
      setSeasonData(null);
    } finally {
      setSeasonLoading(false);
    }
  };

  const handleUpload = async () => {
    toast.info("Starting upload...");
    if (!data?.title) {
      toast.error("Please select a series first");
      return;
    }
    const seasonFld = await createFilemoonFolder({ name: data?.title });
    if (!seasonFld) {
      toast.error("Failed to create season folder");
      return;
    }
    if (!selectedEpisodeData) {
      toast.error("Please select an episode first");
      return;
    }
    const episodeFld = await createFilemoonFolder({
      name: selectedEpisodeData?.name,
      parent: seasonFld.id,
    });
    // const fldRes = await createFilemoonFolder({ name: data?.title});
    console.log(episodeFld);
  };

  return (
    <>
      <Dialog open={openPopover} onOpenChange={setOpenPopover}>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            Get Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter TMDB ID</DialogTitle>
          </DialogHeader>
          <div className={cn("grid items-start gap-4")}>
            <div className="grid gap-2">
              <Label htmlFor="tmdbId">Email</Label>
              <Input
                type="text"
                id="tmdbId"
                placeholder="Enter TMDB ID"
                onChange={(e) => setTmdbId(e.target.value)}
                value={tmdbId}
              />
            </div>

            <Button disabled={loading} onClick={getSeriesData}>
              Get Data
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mt-4">
        {data && (
          <div className="">
            <div className="w-full grid gap-4 min-h-fit border border-gray-400 rounded-md p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-md font-semibold">
                  Series Name
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={data?.title}
                  disabled
                  className=""
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="overview" className="text-md font-semibold">
                  Overview
                </Label>
                <AutosizeTextarea
                  id="overview"
                  disabled
                  value={data?.overview}
                />
              </div>
              <div className="flex space-x-10">
                <div className="flex h-5 items-center space-x-4 text-sm">
                  {/* <Label htmlFor="season">Season</Label> */}
                  <p className="font-semibold">Genres</p>
                  <div className="flex h-5 items-center space-x-2">
                    {data?.genres?.map((genre) => (
                      <span
                        key={genre}
                        className="bg-gray-200/5 px-2 py-1 rounded-xl"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3  items-center text-sm">
                  <p className="font-semibold">Rating</p>
                  <p className="bg-gray-200/5 px-2 py-0.5 rounded-xl">
                    {data?.rating}
                  </p>
                </div>
                <div className="flex space-x-3  items-center text-sm">
                  <p className="font-semibold">Origin Country</p>
                  <p className="bg-gray-200/5 px-2 py-0.5 rounded-xl">
                    {data?.origin}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 p-6 flex items-center space-x-6 border border-gray-400 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className=" flex items-center space-x-3">
                <p>Select Season</p>
                <Popover open={openSeason} onOpenChange={setOpenSeason}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSeason}
                      className="w-auto justify-between"
                      disabled={seasonLoading}
                    >
                      {seasonLoading
                        ? "Loading..."
                        : selectedSeason
                          ? data?.seasons?.find(
                              (season) =>
                                season.season_number === selectedSeason
                            )?.name
                          : "Select Season..."}
                      <ChevronsUpDown
                        className={cn(
                          "opacity-50",
                          seasonLoading && "animate-spin"
                        )}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search season..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No Season found.</CommandEmpty>
                        <CommandGroup>
                          {data?.seasons?.map((season) => (
                            <CommandItem
                              key={season.season_number}
                              value={season.season_number.toString()}
                              onSelect={(currentvalue) =>
                                handleSeasonChange(currentvalue)
                              }
                            >
                              {season?.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  selectedSeason === season.season_number
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {seasonData && (
                <div className=" flex items-center space-x-3">
                  <p>Select Season</p>
                  <Popover open={openEpisode} onOpenChange={setOpenEpisode}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openEpisode}
                        className="w-[200px] justify-between"
                      >
                        {selectedEpisode
                          ? seasonData?.find(
                              (episode) =>
                                episode.episode_number === selectedEpisode
                            )?.name
                          : "Select Episode..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Episode..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No Episode found.</CommandEmpty>
                          <CommandGroup>
                            {seasonData?.map((episode) => (
                              <CommandItem
                                key={episode.episode_number}
                                value={episode.episode_number.toString()}
                                onSelect={(currentValue) => {
                                  setSelectedEpisode(
                                    currentValue === selectedEpisode.toString()
                                      ? 0
                                      : Number(currentValue)
                                  );
                                  setOpenEpisode(false);
                                  if (selectedSeason)
                                    setSelectedEpisodeData(null);
                                  setSelectedEpisodeData(episode);
                                }}
                              >
                                {episode.episode_number + " - " + episode.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    selectedEpisode === episode.episode_number
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            {selectedEpisodeData && (
              <div className="mt-5 p-6 flex items-center  space-x-10 border border-gray-400 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div className="flex justify-center items-center space-x-4">
                  <p className="font-semibold text-base">Episode No.</p>
                  <p>{selectedEpisodeData.episode_number}</p>
                  <p>{selectedEpisodeData.name}</p>
                </div>
                <div className="gap-1.5">
                  {/* <Label htmlFor="picture">Picture</Label> */}
                  <Input id="picture" type="file" />
                </div>
                {/* <Input type="file" className="flex justify-center" /> */}
                <Button onClick={handleUpload}>
                  {" "}
                  <UploadIcon />
                  Upload
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
