import { useCallback, useRef, useState } from "react";
import IconLogo from "../../../common/Icons/IconLogo/IconLogo";
import IconDashLinks from "../../../common/Icons/IconDashLinks/IconDashLinks";
import IconClear from "../../../common/Icons/IconClear/IconClear";
import Button from "../../../common/Button/Button";
import "./FileUpload.scss";
import { useAppDispatch } from "../../../../reducers/hooks";
import { setToast } from "../../../../reducers/toastSlice";
import { useScanDocumentsMutation } from "../../../../services/dashboardService";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_FILES = 3;

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const totalSize = files.reduce((total, file) => total + file.size, 0);
  const totalSizeMB = totalSize / (1024 * 1024);
  const fileCount = files.length;

  const [uploadFiles] = useScanDocumentsMutation();
  const addFiles = useCallback(
    (incomingFiles: FileList | File[]) => {
      const selectedFiles = Array.from(incomingFiles);
      const combined = [...files];
      const rejected: string[] = [];

      selectedFiles.forEach((file) => {
        const isPdf =
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {
          rejected.push(`${file.name}: PDF files only.`);
          return;
        }

        if (file.size === 0) {
          rejected.push(`${file.name}: file is empty.`);
          return;
        }

        const alreadyAdded = combined.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified,
        );

        if (alreadyAdded) return;

        if (combined.length >= MAX_FILES) {
          rejected.push(`${file.name}: maximum of ${MAX_FILES} files reached.`);
          return;
        }

        const currentTotalSize = combined.reduce(
          (total, existing) => total + existing.size,
          0,
        );

        if (currentTotalSize + file.size > MAX_FILE_SIZE) {
          rejected.push(
            `${file.name}: total file size cannot exceed ${MAX_FILE_SIZE_MB} MB.`,
          );
          return;
        }

        combined.push(file);
      });

      if (combined.length !== files.length) {
        setFiles(combined);
      }

      if (rejected.length > 0) {
        const displayedErrors = rejected.slice(0, 2);
        const remainingErrors = rejected.length - displayedErrors.length;

        const message = [
          ...displayedErrors,
          ...(remainingErrors > 0
            ? [`and ${remainingErrors} more file(s) could not be added.`]
            : []),
        ].join(" ");

        dispatch(setToast({ msg: message, error: true }));
      }
    },
    [files, dispatch],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  };

  const submitFiles = useCallback(async () => {
    try {
      const res = await uploadFiles({ files: files }).unwrap();
      console.log(res);
    } catch {
      return;
    }
  }, [files]);

  return (
    <div className="file-upload">
      <form
        className="file-upload__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <label
          className={`file-upload__area ${
            isDragging ? "file-upload__area--dragging" : ""
          }`}
          htmlFor="statement-file"
          onDragEnter={handleDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span className="file-upload__icon">
            <IconLogo width="3rem" height="3rem" />
          </span>

          <span className="file-upload__title">
            {isDragging ? "Drop your statements here" : "Upload Statement"}
          </span>

          <span className="file-upload__description">
            Drag and drop your PDF files here, or browse your files
          </span>

          <span className="file-upload__button">Choose Files</span>

          <span className="file-upload__hint">
            PDF only · Maximum {MAX_FILE_SIZE_MB} MB total · Up to {MAX_FILES}{" "}
            files
          </span>
        </label>

        <input
          ref={inputRef}
          id="statement-file"
          name="statement"
          className="file-upload__input"
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={handleFileChange}
        />
      </form>

      {files.length > 0 && (
        <section className="file-container">
          <div className="file-container__header">
            <div className="file-container__heading">
              <h2 className="file-container__title">Selected Files</h2>
              <p className="file-container__subtitle">
                Review your statements before uploading.
              </p>
            </div>
          </div>

          <div className="file-container__limits">
            <div className="file-container__limit">
              <div className="file-container__limit-info">
                <span className="file-container__limit-label">
                  Total file size
                </span>
                <span className="file-container__limit-value">
                  {totalSizeMB.toFixed(2)} / {MAX_FILE_SIZE_MB} MB
                </span>
              </div>

              <div className="file-container__progress">
                <span
                  className="file-container__progress-fill"
                  style={{
                    width: `${Math.min(
                      (totalSize / MAX_FILE_SIZE) * 100,
                      100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="file-container__limit">
              <div className="file-container__limit-info">
                <span className="file-container__limit-label">
                  Files selected
                </span>
                <span className="file-container__limit-value">
                  {fileCount} / {MAX_FILES}
                </span>
              </div>

              <div className="file-container__progress">
                <span
                  className="file-container__progress-fill"
                  style={{
                    width: `${(fileCount / MAX_FILES) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="file-container__list">
            {files.map((file, index) => (
              <div
                className="file-container__item"
                key={`${file.name}-${file.lastModified}-${index}`}
              >
                <div className="file-container__icon">
                  <IconDashLinks name="scan" />
                </div>

                <div className="file-container__details">
                  <p className="file-container__name">{file.name}</p>
                  <p className="file-container__metadata">
                    PDF document · {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  className="file-container__remove"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeFile(index)}
                >
                  <IconClear size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="file-container__footer">
            <span className="file-container__footer-text">
              {fileCount} {fileCount === 1 ? "statement" : "statements"} ready
            </span>

            <Button
              text="Upload Statements"
              className="file-container__upload-button"
              disabled={files.length === 0}
              onClick={() => submitFiles()}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default FileUpload;
