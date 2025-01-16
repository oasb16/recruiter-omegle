async function scaleService(service, action) {
    const response = await fetch('/scale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, action })
    });
    const data = await response.json();
    alert(data.message);
}
