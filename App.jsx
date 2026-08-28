import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import DashboardView from "./components/DashboardView";
import PredictionView from "./components/PredictionView";
import WhatIfSimulatorView from "./components/WhatIfSimulatorView";
import InterventionCenterView from "./components/InterventionCenterView";
import AnalyticsView from "./components/AnalyticsView";
import ResponsibleAIView from "./components/ResponsibleAIView";
import StudentProfileModal from "./components/StudentProfileModal";
import AIAssistantModal from "./components/AIAssistantModal";

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "landing" && (
          <LandingPage onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === "dashboard" && (
          <DashboardView
            onSelectStudent={(id) => setSelectedStudentId(id)}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === "predict" && (
          <PredictionView
            onNavigateToWhatIf={() => setActiveTab("whatif")}
          />
        )}

        {activeTab === "whatif" && <WhatIfSimulatorView />}

        {activeTab === "interventions" && (
          <InterventionCenterView
            onSelectStudent={(id) => setSelectedStudentId(id)}
          />
        )}

        {activeTab === "analytics" && <AnalyticsView />}

        {activeTab === "responsible" && <ResponsibleAIView />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-black text-white text-sm">EDUPROTECTOR</span>
            <span>— AI-Powered Early Dropout Risk Prediction & Student Success Platform</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Predict Early. Intervene Early. Protect Every Student.</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab("responsible")}
              className="hover:text-white transition underline"
            >
              Responsible AI Guidelines
            </button>
          </div>
        </div>
      </footer>

      {/* Student Profile Modal */}
      {selectedStudentId && (
        <StudentProfileModal
          studentId={selectedStudentId}
          onClose={() => setSelectedStudentId(null)}
        />
      )}

      {/* AI Assistant Chat Modal */}
      {isAssistantOpen && (
        <AIAssistantModal onClose={() => setIsAssistantOpen(false)} />
      )}
    </div>
  );
}
