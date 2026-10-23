import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import { ourProcess } from "./our-process-data";
import { bottomHighlightCn } from "@/app/design-system";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@repo/ui/dialog";

type ProcessStep = (typeof ourProcess)[0];
interface Props {
    i: ProcessStep;
    index: number;
}

export const ProcessItem = ({ i, index }: Props) => {
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Card
                        className={`cursor-pointer flex flex-col gap-8 py-12 px-4 w-full h-full p-0 hover:scale-101 hover:shadow-4xl active:scale-99`}
                        style={{
                            top:
                                index % 2 === 0
                                    ? `${index * 24}px`
                                    : `${(index - 1) * 24}px`,
                        }}
                    >
                        {/* Icon */}
                        <CardHeader className="p-4 py-12 bg-blue-600 flex justify-center items-center mt-0">
                            {i.image}
                        </CardHeader>

                        {/* Title + paragraph */}
                        <CardContent className="p-4 flex flex-col gap-4">
                            <CardTitle className="text-lg sm:text-2xl font-bold text-zinc-50 leading-snug">
                                {i.heading}
                            </CardTitle>
                            <p className="text-sm leading-relaxed text-zinc-400 line-clamp-3">
                                {i.paragraph}
                            </p>
                        </CardContent>

                        {/* Tap hint */}
                        <CardFooter className="w-full p-4">
                            <p className="mt-3 text-xs text-blue-500/60 font-mono">
                                Click to expand →
                            </p>
                        </CardFooter>

                        <div className={bottomHighlightCn} />
                    </Card>
                </DialogTrigger>
                <DialogContent className="md:min-w-200">
                    <DialogHeader>
                        <div className="flex">{i.image}</div>
                    </DialogHeader>
                    <CardContent className="">
                        {/* Heading */}
                        <h3 className="text-2xl font-black text-zinc-50 leading-snug pr-8">
                            {i.heading}
                        </h3>

                        {/* Full paragraph */}
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            {i.paragraph}
                        </p>

                        {/* Detail cards — staggered entrance */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1 gap-4 md:gap-3 lg:gap-4 pt-8 p-2 rounded-2xl">
                            {i.details.map((detail, di) => (
                                <div
                                    className="h-full shadow-none rounded-2xl bg-transparent border-y-transparent flex md:flex-col gap-2"
                                    key={detail.label + di}
                                >
                                    <div className="p-4">{detail.icon}</div>
                                    <div>
                                        <p className="text-sm font-bold text-zinc-200">
                                            {detail.label}
                                        </p>
                                        <p className="text-xs font-light text-zinc-400 leading-relaxed">
                                            {detail.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </DialogContent>
            </Dialog>
        </>
    );
};
