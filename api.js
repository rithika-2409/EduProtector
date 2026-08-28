const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    return await res.json();
  } catch (err) {
    console.error("API Error fetchStats:", err);
    // Fallback static mock if backend loading
    return {
      total_students: 600,
      high_risk: 35,
      medium_risk: 120,
      low_risk: 445,
      departments: [
        { department: "Information Technology", total: 120, high: 9, medium: 25, low: 86 },
        { department: "Computer Science", total: 150, high: 7, medium: 30, low: 113 },
        { department: "Electronics", total: 110, high: 6, medium: 22, low: 82 },
        { department: "Mechanical", total: 110, high: 8, medium: 23, low: 79 },
        { department: "Civil", total: 110, high: 5, medium: 20, low: 85 }
      ],
      model_metrics: { accuracy: 0.975, precision: 0.9725, recall: 0.975, f1_score: 0.9733 }
    };
  }
}

export async function fetchStudents(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/students?${query}`);
    if (!res.ok) throw new Error("Failed to fetch students");
    return await res.json();
  } catch (err) {
    console.error("API Error fetchStudents:", err);
    return [];
  }
}

export async function fetchStudentDetail(studentId) {
  try {
    const res = await fetch(`${API_BASE}/students/${studentId}`);
    if (!res.ok) throw new Error("Failed to fetch student details");
    return await res.json();
  } catch (err) {
    console.error("API Error fetchStudentDetail:", err);
    return null;
  }
}

export async function predictRisk(payload) {
  try {
    const res = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Prediction failed");
    return await res.json();
  } catch (err) {
    console.error("API Error predictRisk:", err);
    throw err;
  }
}

export async function simulateRisk(payload) {
  try {
    const res = await fetch(`${API_BASE}/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Simulation failed");
    return await res.json();
  } catch (err) {
    console.error("API Error simulateRisk:", err);
    throw err;
  }
}

export async function fetchInterventions() {
  try {
    const res = await fetch(`${API_BASE}/interventions`);
    if (!res.ok) throw new Error("Failed to fetch interventions");
    return await res.json();
  } catch (err) {
    console.error("API Error fetchInterventions:", err);
    return [];
  }
}

export async function updateInterventionStatus(studentId, status, notes = "") {
  try {
    const res = await fetch(`${API_BASE}/interventions/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error("Update failed");
    return await res.json();
  } catch (err) {
    console.error("API Error updateInterventionStatus:", err);
    throw err;
  }
}

export async function fetchAnalytics() {
  try {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error("Failed to fetch analytics");
    return await res.json();
  } catch (err) {
    console.error("API Error fetchAnalytics:", err);
    return null;
  }
}

export async function askAssistant(question) {
  try {
    const res = await fetch(`${API_BASE}/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    if (!res.ok) throw new Error("Assistant request failed");
    return await res.json();
  } catch (err) {
    console.error("API Error askAssistant:", err);
    return { answer: "I can help with attendance improvement, backlog recovery plans, and study guidance." };
  }
}
