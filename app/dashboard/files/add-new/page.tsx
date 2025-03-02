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
  createFolder,
  getSeriesSeasonData,
  getTMDBData,
  getUploadServer,
} from "@/lib/functions";
import { toast } from "sonner";
import { EpisodeType, SeriesDataType } from "@/lib/types";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown } from "lucide-react";
// import { set } from "zod";

export default function AddNew() {
  const [openPopover, setOpenPopover] = React.useState(true);
  const [tmdbId, setTmdbId] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState<SeriesDataType | null>(null);
  const [seasonData, setSeasonData] = React.useState<EpisodeType[] | null>(
    null
  );

  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedSeason, setSelectedSeason] = React.useState<number>(0);

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

  const handleGetSeasonData = async () => {
    // const res = await getSeriesSeasonData(tmdbId, 2);

    // setSeasonData(res);

    const data = {
      name: "The Mandalorian",
      parent: 10,
    };
    await createFolder({ info: data });
  };

  const handlegetUploadServer = async () => {
    const res = await getUploadServer();
    console.log(res);
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
            <div className="w-full grid gap-4 min-h-fit border border-amber-400 rounded-md p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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

            <div className="">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {selectedSeason
                      ? data?.seasons?.find(
                          (season) => season.season_number === selectedSeason
                        )?.name
                      : "Select framework..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {data?.seasons?.map((season) => (
                          <CommandItem
                            key={season.season_number}
                            value={season.season_number.toString()}
                            onSelect={(currentValue) => {
                              setSelectedSeason(
                                currentValue === selectedSeason.toString()
                                  ? 0
                                  : Number(currentValue)
                              );
                              setOpen(false);
                            }}
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

              <button onClick={() => console.log(selectedSeason)}>Hello</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
