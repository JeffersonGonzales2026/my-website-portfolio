from pathlib import Path
import traceback
from datetime import datetime

# ============================================================
# PROJECT LOCATION
# ============================================================

ROOT_DIR = Path(__file__).resolve().parent

OUTPUT_FILE = ROOT_DIR / "WEBSITE_ALL_TEXT.txt"
LOG_FILE = ROOT_DIR / "COLLECTOR_LOG.txt"

# ============================================================
# FILE TYPES TO COLLECT
# ============================================================

TEXT_EXTENSIONS = {
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".mjs",
    ".cjs",
    ".json",
    ".html",
    ".htm",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".md",
    ".txt",
    ".sql",
    ".xml",
    ".yml",
    ".yaml",
    ".toml",
    ".ini",
    ".conf",
    ".config",
}

SPECIAL_TEXT_FILES = {
    ".gitignore",
    ".gitattributes",
    ".npmrc",
    "Dockerfile",
}

# ============================================================
# FOLDERS TO EXCLUDE
# ============================================================

EXCLUDED_DIRECTORIES = {
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".vercel",
    "coverage",
    "__pycache__",
}

# ============================================================
# FILES TO EXCLUDE
# ============================================================

EXCLUDED_FILES = {
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    ".env.development.local",
    ".env.production.local",
    ".env.test.local",
    "WEBSITE_ALL_TEXT.txt",
    "COLLECTOR_LOG.txt",
    "collect_website_text.py",
}

# ============================================================
# LOGGING
# ============================================================

def log(message):
    print(message)

    try:
        with LOG_FILE.open(
            "a",
            encoding="utf-8"
        ) as log_file:
            log_file.write(message + "\n")
    except Exception:
        pass


# ============================================================
# FILE CHECKS
# ============================================================

def is_excluded(path):
    """
    Check whether a file or one of its parent folders
    should be excluded.
    """

    if path.name in EXCLUDED_FILES:
        return True

    try:
        relative_parts = path.relative_to(ROOT_DIR).parts
    except ValueError:
        return True

    for part in relative_parts:

        if part in EXCLUDED_DIRECTORIES:
            return True

    return False


def is_text_file(path):
    """
    Determine whether this is a text/code file.
    """

    if path.name in SPECIAL_TEXT_FILES:
        return True

    return path.suffix.lower() in TEXT_EXTENSIONS


# ============================================================
# COLLECT FILES
# ============================================================

def collect_files():

    collected = []

    log("")
    log("Scanning project...")
    log("")

    for path in ROOT_DIR.rglob("*"):

        try:

            if not path.is_file():
                continue

            if is_excluded(path):
                continue

            if not is_text_file(path):
                continue

            collected.append(path)

        except Exception as error:

            log(
                f"[WARNING] Could not process: {path}"
            )

            log(
                f"          {error}"
            )

    collected.sort(
        key=lambda item: str(
            item.relative_to(ROOT_DIR)
        ).lower()
    )

    return collected


# ============================================================
# READ FILE
# ============================================================

def read_file(path):

    try:

        return path.read_text(
            encoding="utf-8",
            errors="replace"
        )

    except Exception as error:

        return (
            "\n"
            "[ERROR READING THIS FILE]\n"
            f"{error}\n"
        )


# ============================================================
# CREATE OUTPUT
# ============================================================

def create_output(files):

    log("")
    log("Creating WEBSITE_ALL_TEXT.txt...")
    log("")

    with OUTPUT_FILE.open(
        "w",
        encoding="utf-8",
        newline="\n"
    ) as output:

        output.write(
            "=" * 80 + "\n"
        )

        output.write(
            "MY-PORTFOLIO-WEBSITE - COMPLETE TEXT/CODE COLLECTION\n"
        )

        output.write(
            "=" * 80 + "\n\n"
        )

        output.write(
            f"Project folder:\n{ROOT_DIR}\n\n"
        )

        output.write(
            f"Files collected: {len(files)}\n\n"
        )

        output.write(
            "SECURITY EXCLUSIONS:\n"
        )

        output.write(
            "- .env files\n"
        )

        output.write(
            "- node_modules\n"
        )

        output.write(
            "- .git\n"
        )

        output.write(
            "- dist\n"
        )

        output.write(
            "- build\n"
        )

        output.write(
            "- binary files\n"
        )

        output.write(
            "- this collector script\n"
        )

        output.write(
            "\n"
        )

        output.write(
            "=" * 80 + "\n"
        )

        output.write(
            "BEGIN FILES\n"
        )

        output.write(
            "=" * 80 + "\n\n"
        )

        for number, path in enumerate(
            files,
            start=1
        ):

            relative_path = path.relative_to(
                ROOT_DIR
            )

            log(
                f"[{number}/{len(files)}] {relative_path}"
            )

            output.write(
                "\n"
                + "#" * 80
                + "\n"
            )

            output.write(
                f"# FILE {number} OF {len(files)}\n"
            )

            output.write(
                f"# PATH: {relative_path}\n"
            )

            output.write(
                "#" * 80
                + "\n\n"
            )

            content = read_file(path)

            output.write(content)

            if not content.endswith("\n"):
                output.write("\n")

            output.write(
                "\n"
                + "#" * 80
                + "\n"
            )

            output.write(
                f"# END OF FILE: {relative_path}\n"
            )

            output.write(
                "#" * 80
                + "\n\n"
            )


# ============================================================
# MAIN
# ============================================================

def main():

    # Start fresh log
    try:

        LOG_FILE.write_text(
            "",
            encoding="utf-8"
        )

    except Exception:
        pass

    log("=" * 80)
    log("MY-PORTFOLIO-WEBSITE TEXT/CODE COLLECTOR")
    log("=" * 80)

    log("")
    log("Python script location:")
    log(str(Path(__file__).resolve()))

    log("")
    log("Project folder:")
    log(str(ROOT_DIR))

    log("")
    log("Output file will be:")
    log(str(OUTPUT_FILE))

    log("")
    log("Log file will be:")
    log(str(LOG_FILE))

    # --------------------------------------------------------
    # TEST FILE CREATION
    # --------------------------------------------------------

    log("")
    log("Testing file creation...")

    try:

        OUTPUT_FILE.write_text(
            "COLLECTOR STARTED\n",
            encoding="utf-8"
        )

        log(
            "[OK] Successfully created output file."
        )

    except Exception as error:

        log("")
        log("[ERROR] Could not create output file.")
        log("")
        log(str(error))
        log("")
        log(traceback.format_exc())

        input(
            "\nPress Enter to exit..."
        )

        return

    # --------------------------------------------------------
    # COLLECT
    # --------------------------------------------------------

    files = collect_files()

    log("")
    log(
        f"[OK] Found {len(files)} text/code files."
    )

    # --------------------------------------------------------
    # WRITE
    # --------------------------------------------------------

    try:

        create_output(files)

    except Exception as error:

        log("")
        log(
            "[ERROR] Failed while creating output."
        )

        log("")
        log(str(error))

        log("")
        log(traceback.format_exc())

        input(
            "\nPress Enter to exit..."
        )

        return

    # --------------------------------------------------------
    # VERIFY
    # --------------------------------------------------------

    log("")
    log("=" * 80)
    log("COMPLETE")
    log("=" * 80)

    log("")
    log(
        f"Files collected : {len(files)}"
    )

    log(
        f"Output file     : {OUTPUT_FILE}"
    )

    log(
        f"Output exists   : {OUTPUT_FILE.exists()}"
    )

    if OUTPUT_FILE.exists():

        size = OUTPUT_FILE.stat().st_size

        log(
            f"Output size     : {size:,} bytes"
        )

    log("")
    log(
        "Security exclusions:"
    )

    log(
        "  - .env files"
    )

    log(
        "  - node_modules"
    )

    log(
        "  - .git"
    )

    log(
        "  - dist/build"
    )

    log(
        "  - binary files"
    )

    log("")
    log(
        f"TXT FILE:"
    )

    log(
        str(OUTPUT_FILE)
    )

    log("")
    log("=" * 80)

    input(
        "\nPress Enter to exit..."
    )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    main()