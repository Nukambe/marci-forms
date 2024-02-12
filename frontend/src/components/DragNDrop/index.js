import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export function DragDropItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString({
      x: transform?.x,
      y: transform?.y,
      scaleX: 1,
      scaleY: 1,
    }),
  };

  return (
    <div ref={setNodeRef} style={style} className="flex w-full touch-none">
      <div
        {...attributes}
        {...listeners}
        className="flex items-start justify-center text-gray-400 cursor-move h-fit"
      >
        <EllipsisVerticalIcon className="w-8" />
        <EllipsisVerticalIcon className="w-8 -translate-x-6" />
      </div>
      {children}
    </div>
  );
}

export function DragDropList({ children, items, setItems }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="space-y-16">{children}</ul>
      </SortableContext>
    </DndContext>
  );
}
