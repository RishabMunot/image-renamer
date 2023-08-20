import React from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { useDragDrop } from "../DragDropProvider";
import { ColumnDropshadow, Container } from "./Board.styled";
import ImageGallery from "../ImageGallery/ImageGallery";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shadcn/ui/card";

const Board: React.FC = () => {
  const {
    handleDragEnd,
    handleDragStart,
    handleDragUpdate,
    colDropshadowProps,
    columns,
  } = useDragDrop();

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="">
                  <ImageGallery
                    key={columns[0].id}
                    column={columns[0]}
                    columnIndex={0}
                  />
                </CardContent>
              </Card>
            </div>
            <Container
              id="image-board"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.slice(1).map((column, columnIndex) => (
                <Column
                  key={column.id}
                  column={column}
                  columnIndex={columnIndex + 1}
                />
              ))}
              {provided.placeholder}
              {snapshot.isDraggingOver && (
                <ColumnDropshadow
                  marginLeft={colDropshadowProps.marginLeft}
                  height={colDropshadowProps.height}
                />
              )}
            </Container>
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
