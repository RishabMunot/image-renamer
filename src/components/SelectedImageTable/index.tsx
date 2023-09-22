import { v4 } from "uuid";
import { DataTable } from "../../shadcn/ui/data-table";
import { useDragDrop } from "../DragDropProvider";
import { ImageFile, useImages } from "../ImagesProvider";
import { columns } from "./columns";
import { Button } from "../../shadcn/ui/button";

type DownloadImage = { file: ImageFile; renamedFileName: string };

const downloadImage = (url: string, fileName: string) => {
  const element = document.createElement("a");
  element.href = url;
  element.download = fileName;

  document.body.appendChild(element);
  element.click();
  element.remove();
};

const downloadImageArray = (imageArray: DownloadImage[]) => {
  const downloadNext = (i: number) => {
    if (i >= imageArray.length) {
      return;
    }
    downloadImage(imageArray[i].file.url, imageArray[i].renamedFileName);
    setTimeout(function () {
      downloadNext(i + 1);
    }, 300);
  };
  downloadNext(0);
};

const SelectedImageTable = () => {
  const { renameState, setRenameState, setImages, setStyleParams } =
    useImages();
  const { setColumns } = useDragDrop();
  const removeItem = (idx: number) => {
    setRenameState((prevState) => {
      const [removedState] = prevState.splice(idx, 1);
      setImages((prevImages) => {
        return [
          ...prevImages,
          ...removedState.frontImages,
          ...removedState.backImages,
          ...removedState.sideImages,
          ...removedState.zoomImages,
          ...removedState.extraImages,
        ];
      });
      return [...prevState];
    });
  };
  const editItem = (idx: number) => {
    setRenameState((prevState) => {
      const [removedState] = prevState.splice(idx, 1);
      setStyleParams(removedState.styleParams);
      setColumns((prevColumns) => {
        prevColumns[1].images = removedState.frontImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        prevColumns[2].images = removedState.backImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        prevColumns[3].images = removedState.sideImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        prevColumns[4].images = removedState.zoomImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        prevColumns[5].images = removedState.extraImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        return [...prevColumns];
      });
      return [...prevState];
    });
  };
  return (
    <div className=" mx-auto py-6">
      <div>
        <h3 className="mt-2 mb-2">Selected Images</h3>
      </div>
      <DataTable
        columns={columns}
        data={renameState}
        meta={{ removeItem, editItem }}
      />
      <Button
        className="mb-2 mt-4"
        onClick={() => {
          const renamedImageArray: DownloadImage[] = [];
          renameState.forEach((rs) => {
            const { styleCode, color, photoType, photoshootType } =
              rs.styleParams;

            rs.frontImages.forEach((file, idx) => {
              renamedImageArray.push({
                file,
                renamedFileName: `${styleCode}-${color}-${photoType}-${photoshootType}-1F${
                  idx + 1
                }.jpg`,
              });
            });

            rs.backImages.forEach((file, idx) => {
              renamedImageArray.push({
                file,
                renamedFileName: `${styleCode}-${color}-${photoType}-${photoshootType}-2B${
                  idx + 1
                }.jpg`,
              });
            });

            rs.sideImages.forEach((file, idx) => {
              renamedImageArray.push({
                file,
                renamedFileName: `${styleCode}-${color}-${photoType}-${photoshootType}-3S${
                  idx + 1
                }.jpg`,
              });
            });

            rs.zoomImages.forEach((file, idx) => {
              renamedImageArray.push({
                file,
                renamedFileName: `${styleCode}-${color}-${photoType}-${photoshootType}-4Z${
                  idx + 1
                }.jpg`,
              });
            });

            rs.extraImages.forEach((file, idx) => {
              renamedImageArray.push({
                file,
                renamedFileName: `${styleCode}-${color}-${photoType}-${photoshootType}-5E${
                  idx + 1
                }.jpg`,
              });
            });
          });
          downloadImageArray(renamedImageArray);
        }}
      >
        Export
      </Button>
    </div>
  );
};
export default SelectedImageTable;