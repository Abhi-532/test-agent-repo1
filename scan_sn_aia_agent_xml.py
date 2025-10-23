import os
import subprocess
import xml.etree.ElementTree as ET

def clone_repo(repo_url, branch, dest_dir):
    subprocess.run(["git", "clone", "--branch", branch, repo_url, dest_dir], check=True)

def find_sn_aia_agent_xml_files(root_dir):
    matches = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.startswith("sn_aia_agent") and filename.endswith(".xml"):
                matches.append(os.path.join(dirpath, filename))
    return matches

def check_active_tag(xml_file):
    try:
        tree = ET.parse(xml_file)
        root = tree.getroot()
        active_elem = root.find("active")
        if active_elem is not None and active_elem.text.strip().lower() == "false":
            return True
    except Exception as e:
        print(f"Error parsing {xml_file}: {e}")
    return False

def main():
    repo_url = "https://github.com/Abhi-532/test-agent-repo1.git"
    branch = "abtest"
    dest_dir = "cloned_repo"
    clone_repo(repo_url, branch, dest_dir)
    xml_files = find_sn_aia_agent_xml_files(dest_dir)
    print("Files where <active> is set to false:")
    for xml_file in xml_files:
        if check_active_tag(xml_file):
            print(os.path.relpath(xml_file, dest_dir))

if __name__ == "__main__":
    main()
