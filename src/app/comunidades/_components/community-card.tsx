import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useRouter } from "next/navigation";

type CommunityCardProps = {
  data: {
    slug: string;
    image: string;
    name: string;
    city: string;
    state: string;
    description: string;
    totalMembers: number;
    tags: string[];
  };
  filteredTag?: string;
};

const organizeTagDisplay = (tags: string[], filteredTag?: string) => {
  const reorderedTags = [...tags];

  if (filteredTag && tags.includes(filteredTag)) {
    const index = reorderedTags.indexOf(filteredTag);

    reorderedTags.splice(index, 1);
    reorderedTags.unshift(filteredTag);
  }

  const visibleTags = reorderedTags.slice(0, 4);
  const overflowTags = reorderedTags.slice(4);

  return { visibleTags, overflowTags };
};

export default function CommunityCard({
  data,
  filteredTag,
}: CommunityCardProps) {
  const router = useRouter();
  const { visibleTags, overflowTags } = organizeTagDisplay(
    data.tags,
    filteredTag,
  );

  const renderTagChip = (tag: string, index: number) => (
    <Chip
      key={`communities-${data.name}-tag-${index}`}
      color={filteredTag === tag ? "secondary" : "default"}
      size="sm"
    >
      {tag}
    </Chip>
  );

  const renderOverflowPopover = () => {
    if (overflowTags.length === 0) return null;

    return (
      <Popover placement="bottom">
        <PopoverTrigger>
          <Chip className="pointer" size="sm">
            + tags
          </Chip>
        </PopoverTrigger>
        <PopoverContent className="px-2 py-2 max-w-[250px]">
          <div className="gap-1 flex flex-wrap">
            {overflowTags.map((tag) => (
              <Chip key={`communities-${data.slug}-tag-${tag}`} size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const handleCardClick = () => router.push("/comunidade/" + data.slug);

  return (
    <Card
      isPressable
      className="col-span-1 cursor-pointer"
      onPress={handleCardClick}
    >
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            height={56}
            src={data.image}
            width={56}
          />
          <div className="text-left">
            <h4 className="font-bold text-large leading-none">{data.name}</h4>
            <p className="text-sm">
              {data.city}, {data.state}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="-mt-4 flex-col items-start gap-1">
        <div className="flex gap-1 flex-wrap max-h-[56px] overflow-hidden">
          <Chip className="" color="primary" size="sm">
            {data.totalMembers} Membros
          </Chip>

          {visibleTags.map(renderTagChip)}
          {renderOverflowPopover()}
        </div>

        <p className="text-sm hyphens-auto overflow-hidden text-ellipsis line-clamp-3">
          {data.description}
        </p>
      </CardBody>
    </Card>
  );
}
