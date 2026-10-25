import os


def combine_files_to_single_txt(folder_path, output_file="api_output.txt"):
    # Folders to skip entirely
    ignore_folders = {
        "__pycache__", ".git", ".venv", "venv", "env",
        "node_modules", "dist", "build", ".idea", ".vscode",
        ".pytest_cache", ".mypy_cache", ".cache",
        "vendor", "tools",
    }

    # Extensions to skip
    ignore_extensions = {
        # binaries
        ".pyc", ".pyo", ".pyd",
        ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico",
        ".webp", ".bmp", ".tiff",
        ".woff", ".woff2", ".ttf", ".eot", ".otf",
        ".mp3", ".mp4", ".wav", ".avi", ".mov", ".webm",
        ".zip", ".tar", ".gz", ".rar", ".7z",
        ".exe", ".dll", ".so", ".dylib",
        # runtime
        ".log", ".db", ".sqlite3",
        # docs / misc
        ".md",           # ✅ excluded — no Markdown
        ".lock", ".tmp",
    }

    # Exact filenames to skip
    ignore_files = {
        "package-lock.json", "yarn.lock",
        ".DS_Store", "Thumbs.db",
        "pyth.py",            # the script itself
        "api_output.txt",     # its own output
    }

    # Filename suffix patterns to skip
    ignore_suffixes = (
        ".min.js", ".min.css", ".map",
        ".test.js", ".spec.js", "_test.py",
    )

    # Sanity check
    if not os.path.isdir(folder_path):
        print(f"❌ Folder not found: {folder_path}")
        raise SystemExit(1)

    print(f"✅ Scanning: {folder_path}")

    output_abs = os.path.abspath(output_file)
    count = 0

    with open(output_file, "w", encoding="utf-8") as out_file:
        for root, dirs, files in os.walk(folder_path):
            # Remove unwanted folders in-place so os.walk skips them
            dirs[:] = [d for d in dirs if d not in ignore_folders]
            files.sort()

            for file in files:
                # Extension filter
                if any(file.endswith(ext) for ext in ignore_extensions):
                    continue
                # Exact name filter
                if file in ignore_files:
                    continue
                # Suffix pattern filter
                if any(file.endswith(suf) for suf in ignore_suffixes):
                    continue

                file_path = os.path.join(root, file)

                # Skip the output file itself
                if os.path.abspath(file_path) == output_abs:
                    continue

                rel_path = os.path.relpath(file_path, folder_path)

                try:
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()

                    out_file.write(f"\n{'='*80}\n")
                    out_file.write(f"File: {file}\n")
                    out_file.write(f"Path: {rel_path}\n")
                    out_file.write(f"{'='*80}\n\n")

                    out_file.write(content.strip())
                    out_file.write("\n\n")

                    count += 1

                except Exception as e:
                    out_file.write(f"Error reading {rel_path}: {e}\n\n")

    print(f"Created: {output_file}")
    print(f"  Files merged: {count}")


# 🔥 Your folder path — note the HYPHEN
folder_path = r"D:\banking-practice (2)\bp"
output_file = r"D:\banking-practice (2)\api_output.txt"

combine_files_to_single_txt(folder_path, output_file)