export async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Failed to load ${file}: ${response.statusText}`);
        }
        const content = await response.text();
        document.getElementById(id).innerHTML = content;
    } catch (error) {
        console.error(`Error loading component into #${id}:`, error);
    }
}