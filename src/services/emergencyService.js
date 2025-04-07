// Detect platform
const isWeb = typeof window !== "undefined" && window.document;

class EmergencyService {
  constructor() {
    this.emergencySound = null;
    this.isPlaying = false;
  }

  // Initialize emergency sound
  async initEmergencySound() {
    this.emergencySound = new Audio("/sounds/emergency-siren.mp3");
    this.emergencySound.loop = true;
  }

  // Play emergency sound
  playEmergencySound() {
    if (this.emergencySound && !this.isPlaying) {
      this.emergencySound.play().catch((error) => {
        console.error("Failed to play sound:", error);
      });
      this.isPlaying = true;
    }
  }

  // Stop emergency sound
  stopEmergencySound() {
    if (this.emergencySound && this.isPlaying) {
      this.emergencySound.pause();
      this.emergencySound.currentTime = 0;
      this.isPlaying = false;
    }
  }

  // Handle emergency call
  async handleEmergencyCall(location) {
    try {
      // Start emergency sound
      this.playEmergencySound();

      // Send emergency request to backend
      const response = await fetch("https://docqueue-backend.onrender.com/api/emergency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          timestamp: new Date().toISOString(),
          platform: "web",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send emergency request");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Emergency call failed:", error);
      throw error;
    }
  }

  // Get nearby ambulances
  async getNearbyAmbulances(location) {
    try {
      const response = await fetch(
        `https://docqueue-backend.onrender.com/api/ambulances/nearby`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch nearby ambulances");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to get nearby ambulances:", error);
      throw error;
    }
  }

  // Track ambulance location
  async trackAmbulance(ambulanceId) {
    try {
      const response = await fetch(
        `https://docqueue-backend.onrender.com/api/ambulances/${ambulanceId}/track`
      );
      if (!response.ok) {
        throw new Error("Failed to track ambulance");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to track ambulance:", error);
      throw error;
    }
  }
}

export const emergencyService = new EmergencyService();
