import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

interface Props {
    data: { name: string };
    setData: (key: string, value: string) => void;
    errors: { name?: string };
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

const CreateCategoryDialog = ({
    data,
    setData,
    errors,
    processing,
    onSubmit,
}: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Create Category +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Task Category</DialogTitle>
                    <DialogDescription>
                        Add a new task category by filling out the form below.
                        Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-red-500">{errors.name}</div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={processing}
                        onClick={onSubmit}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryDialog;
