"use client";

import * as React from "react";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

export type User = {
    id: string;
    name: string;
    email: string;
    status: "verified" | "not verified";
    phone: string;
    bio: string;
};

const initialData: User[] = [
    {
        id: "u1234",
        name: "Daniel Orwenjo",
        email: "daniel@example.com",
        status: "verified",
        phone: "+254712345678",
        bio: "Lead developer at Danamo Tech.",
    },
    {
        id: "u2453",
        name: "Janet Mueni",
        email: "Janet@example.com",
        status: "not verified",
        phone: "+254798765432",
        bio: "Marketing specialist.",
    },
];

export const userColumns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "UID",
        cell: ({ row }) => <code className="text-xs text-muted-foreground">{row.getValue("id")}</code>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge
                variant={row.getValue("status") === "verified" ? "default" : "secondary"}
                className={
                    row.getValue("status") === "verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                }
            >
                {row.getValue("status")}
            </Badge>
        ),
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.getValue("phone"),
    },
    {
        accessorKey: "bio",
        header: "Bio",
        cell: ({ row }) => row.getValue("bio"),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function UserDataTable() {
    const [data, setData] = React.useState<User[]>(initialData);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [filterValue, setFilterValue] = React.useState("");

    // Debounce filter value to prevent excessive re-renders
    const debouncedFilterValue = useDebounce(filterValue, 300);

    // Memoize filtered data to avoid recalculating on every render
    const filteredData = React.useMemo(() => {
        return data.filter(
            (user) =>
                user.email.toLowerCase().includes(debouncedFilterValue.toLowerCase()) ||
                user.id.toLowerCase().includes(debouncedFilterValue.toLowerCase())
        );
    }, [data, debouncedFilterValue]);

    const table = useReactTable({
        data: filteredData,
        columns: userColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const [formData, setFormData] = React.useState<User>({
        id: "",
        name: "",
        email: "",
        status: "not verified",
        phone: "",
        bio: "",
    });

    const handleInput = (key: keyof User, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleAddUser = () => {
        const newUser = {
            ...formData,
            id: `u${Math.floor(Math.random() * 10000)}`,
        };
        setData((prev) => [...prev, newUser]);
        setFormData({
            id: "",
            name: "",
            email: "",
            status: "not verified",
            phone: "",
            bio: "",
        });
    };

    return (
        <div className="w-full">
            <div className="h-14 w-full px-3 py-2 mb-4 rounded-md border-muted bg-muted/40 dark:bg-muted/30 flex items-center justify-between gap-4">
                <Input
                    placeholder="Search by email or UID..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="h-8 w-64 text-sm"
                />

                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" size="sm">
                                <Plus className="h-4 w-4 mr-1" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                                <div className="grid gap-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInput("name", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => handleInput("email", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => handleInput("phone", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => handleInput("bio", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label>Status</Label>
                                    <RadioGroup
                                        defaultValue={formData.status}
                                        onValueChange={(val) => handleInput("status", val)}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="verified" id="verified" />
                                            <Label htmlFor="verified">Verified</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="not verified" id="not-verified" />
                                            <Label htmlFor="not-verified">Not verified</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddUser}>Save</Button>
                            </DialogFooter>
                        </DialogContent>
                        
                    </Dialog>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((group) => (
                            <TableRow key={group.id}>
                                {group.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={userColumns.length} className="text-center py-6">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
                <div>
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} selected
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}