  // Chatbot application state
  const state = {
    currentChatId: null,
    chats: {},
    isBotTyping: false,
    knowledgeBase: {},
    learningQueue: [],
    pendingDeleteChatId: null,
    learningMode: false
  };

  // DOM elements
  const chatContainer = document.getElementById('chat-container');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const chatHistory = document.getElementById('chatHistory');
  const newChatBtn = document.getElementById('newChatBtn');
  const confirmDialog = document.getElementById('confirmDialog');
  const cancelDelete = document.getElementById('cancelDelete');
  const confirmDelete = document.getElementById('confirmDelete');
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');

  // Initialize knowledge base with core Buddhist teachings
  function initializeKnowledgeBase() {
    // Try to load from localStorage first
    const savedKnowledge = localStorage.getItem('buddhistKnowledgeBase');
    if (savedKnowledge) {
      state.knowledgeBase = JSON.parse(savedKnowledge);
      showNotification('Knowledge base loaded successfully');
      return;
    }

    // Default knowledge base if none exists
    state.knowledgeBase = {
      // Core concepts
      "three baskets": {
        answer: "The Tipiṭaka (Three Baskets) is the traditional collection of Theravāda Buddhist scriptures in Pali. It consists of:\n\n" +
                "1. **Vinaya Piṭaka**: Rules and procedures for monastic discipline, including the origin stories of rules, framework for communal decision-making, and guidelines for harmonious community living.\n\n" +
                "2. **Sutta Piṭaka**: Discourses of the Buddha organized into five collections (Nikāyas): Dīgha (long), Majjhima (middle-length), Saṃyutta (connected), Aṅguttara (numerical), and Khuddaka (minor texts including Dhammapada and Jātaka tales).\n\n" +
                "3. **Abhidhamma Piṭaka**: Systematic philosophical and psychological analysis of the teachings, presenting the ultimate reality behind conventional expressions of the Dhamma.",
        keywords: ["tipitaka", "three baskets", "pali canon", "buddhist scriptures", "pali texts", "dhamma collection", "tripitaka", "sacred texts", "vinaya", "sutta", "abhidhamma"],
        confidence: 0.95,
        related: ["early buddhism", "pali language", "theravada", "buddha's teachings", "buddhist texts"],
        source: "Traditional Buddhist scholarship, based on Theravāda lineage",
        usageCount: 0,
        lastUsed: null
      },
      "anatta": {
        answer: "Anattā (non-self) is one of Buddhism's most profound and distinctive teachings. It asserts that within the ever-changing flow of physical and mental phenomena that constitute a person, there is no unchanging essence, permanent soul, or intrinsic self that could be called 'I' or 'mine.'\n\nThis doesn't deny our conventional sense of identity but reveals that upon close examination, what we call 'self' is actually composed of five aggregates (pañcakkhandha): physical form, feelings, perceptions, mental formations, and consciousness—all of which are impermanent, subject to suffering, and not-self.\n\nUnderstanding anattā leads to freedom from self-identification and clinging, which are the roots of suffering. The Buddha taught this to help us let go of attachment rather than as a metaphysical position about the non-existence of self.",
        keywords: ["anatta", "non-self", "no soul", "selflessness", "anatman", "no-self", "egolessness", "not-self", "no permanent self", "self-emptiness"],
        confidence: 0.95,
        related: ["five aggregates", "three marks of existence", "impermanence", "dukkha", "emptiness"],
        source: "Core teaching found throughout the Pali Canon, particularly in the Anattalakkhana Sutta (SN 22.59)",
        usageCount: 0,
        lastUsed: null
      },
      "four noble truths": {
        answer: "The Four Noble Truths form the foundation of the Buddha's teachings, first expounded in his Deer Park sermon at Sarnath:\n\n" +
                "1. **Dukkha (Suffering)**: Life inherently contains suffering, dissatisfaction, and stress—from obvious physical pain to subtle existential angst. Even pleasant experiences are impermanent and ultimately unsatisfying.\n\n" +
                "2. **Samudaya (Origin)**: The cause of suffering is craving (taṇhā) in its various forms: craving for sensual pleasures, craving for existence, and craving for non-existence. This craving arises from ignorance of the true nature of reality.\n\n" +
                "3. **Nirodha (Cessation)**: Suffering can end through the complete cessation of craving. This cessation is Nibbāna (Nirvana)—the unconditioned state of peace, freedom, and highest happiness.\n\n" +
                "4. **Magga (Path)**: The way to end suffering is the Noble Eightfold Path, a comprehensive training in ethics, meditation, and wisdom that transforms our relationship with life.\n\n" +
                "These truths function like a medical diagnosis: identifying the illness, its cause, affirming a cure exists, and prescribing the treatment.",
        keywords: ["four noble truths", "ariya sacca", "buddha's first teaching", "dhammacakkappavattana sutta", "noble truths", "suffering truth", "origin truth", "cessation truth", "path truth", "four truths"],
        confidence: 0.98,
        related: ["eightfold path", "dukkha", "nirvana", "dependent origination", "middle way"],
        source: "Dhammacakkappavattana Sutta (SN 56.11), Buddha's first discourse after enlightenment",
        usageCount: 0,
        lastUsed: null
      },
      "eightfold path": {
        answer: "The Noble Eightfold Path (Ariya Aṭṭhaṅgika Magga) is the Buddha's practical guide to liberation, comprising eight integrated factors grouped into three trainings:\n\n" +
                "**I. Wisdom (Paññā)**\n" +
                "1. **Right View**: Understanding the Four Noble Truths and seeing reality clearly\n" +
                "2. **Right Intention**: Cultivating thoughts of renunciation, goodwill, and harmlessness\n\n" +
                "**II. Ethical Conduct (Sīla)**\n" +
                "3. **Right Speech**: Abstaining from lying, divisive speech, harsh words, and idle chatter\n" +
                "4. **Right Action**: Abstaining from killing, stealing, and sexual misconduct\n" +
                "5. **Right Livelihood**: Earning a living in ways that don't harm others\n\n" +
                "**III. Mental Discipline (Samādhi)**\n" +
                "6. **Right Effort**: Preventing unwholesome states and cultivating wholesome ones\n" +
                "7. **Right Mindfulness**: Maintaining awareness of body, feelings, mind, and phenomena\n" +
                "8. **Right Concentration**: Developing one-pointed focus through meditation\n\n" +
                "Rather than sequential steps, these factors are developed simultaneously, reinforcing each other. The path is both the means to liberation and an expression of awakening itself.",
        keywords: ["eightfold path", "magga", "path to liberation", "ariya atthangika magga", "noble path", "middle way path", "eight factors", "eight limbs", "right view", "right action"],
        confidence: 0.94,
        related: ["four noble truths", "ethical conduct", "meditation", "wisdom", "mindfulness"],
        source: "Found throughout the Pali Canon, particularly in the Magga-vibhaṅga Sutta (SN 45.8)",
        usageCount: 0,
        lastUsed: null
      },
      "five aggregates": {
        answer: "The Five Aggregates (pañcakkhandha or five skandhas) represent the Buddha's analytical framework for understanding what we conventionally call a 'person' or 'self.' These five interdependent processes constitute our entire psychophysical experience:\n\n" +
                "1. **Rūpa (Form/Matter)**: The physical body and material world, composed of the four great elements (earth/solidity, water/cohesion, fire/temperature, air/motion)\n\n" +
                "2. **Vedanā (Feeling/Sensation)**: The pleasant, unpleasant, or neutral feeling tone that accompanies every experience\n\n" +
                "3. **Saññā (Perception)**: Recognition and interpretation of sensory and mental objects through naming and categorizing\n\n" +
                "4. **Saṅkhāra (Mental Formations)**: Volitional forces including thoughts, emotions, intentions, habits, and all mental constructs that shape karma\n\n" +
                "5. **Viññāṇa (Consciousness)**: The basic awareness that cognizes objects through the six sense doors (sight, sound, smell, taste, touch, and mind)\n\n" +
                "The Buddha taught that none of these aggregates, either individually or collectively, constitutes a permanent self. Understanding their impermanent, unsatisfactory, and selfless nature leads to dispassion, detachment, and liberation.",
        keywords: ["five aggregates", "skandhas", "pañcakkhandha", "khandha", "five heaps", "aggregates of clinging", "form", "feeling", "perception", "mental formations", "consciousness"],
        confidence: 0.95,
        related: ["anatta", "impermanence", "dependent origination", "six sense bases", "clinging"],
        source: "Explained in detail in the Khandha Saṃyutta (SN 22) and Anattalakkhana Sutta (SN 22.59)",
        usageCount: 0,
        lastUsed: null
      },
      "dependent origination": {
        answer: "Dependent Origination (paṭiccasamuppāda) is the Buddha's profound teaching on causality that explains how suffering arises and ceases. This 12-link chain describes the conditioned arising of phenomena without requiring an ultimate creator or first cause:\n\n" +
                "1. **Ignorance** (avijjā) → 2. **Mental formations** (saṅkhāra) → 3. **Consciousness** (viññāṇa) → \n" +
                "4. **Name-and-form** (nāmarūpa) → 5. **Six sense bases** (saḷāyatana) → 6. **Contact** (phassa) → \n" +
                "7. **Feeling** (vedanā) → 8. **Craving** (taṇhā) → 9. **Clinging** (upādāna) → \n" +
                "10. **Becoming** (bhava) → 11. **Birth** (jāti) → 12. **Aging-and-death** (jarāmaraṇa), with sorrow, lamentation, pain, grief, and despair.\n\n" +
                "This teaching shows that all phenomena arise dependent on causes and conditions. When one factor ceases, those dependent on it also cease. Understanding this process reveals that there is no permanent self moving through successive lives but rather a continuous flow of cause and effect. This insight breaks the cycle of suffering and leads to liberation.",
        keywords: ["dependent origination", "paticca samuppada", "conditioned arising", "twelve links", "causality", "conditionality", "cause and effect", "twelve nidanas", "dependent co-arising", "conditional genesis"],
        confidence: 0.92,
        related: ["ignorance", "karma", "rebirth", "four noble truths", "emptiness", "impermanence"],
        source: "Found throughout the Pali Canon, particularly in the Nidana Samyutta (SN 12)",
        usageCount: 0,
        lastUsed: null
      },
      "meditation": {
        answer: "Meditation (bhāvanā) in Buddhism is the systematic training of the mind that leads to insight, tranquility, and ultimately, liberation. The Buddha taught various meditation techniques appropriate for different temperaments and stages of practice. The two main categories are:\n\n" +
                "**Samatha (Concentration/Tranquility)**: Practices that develop focus, calm, and jhānas (meditative absorptions) by training attention on a single object like the breath (ānāpānasati), a visualization, or loving-kindness (mettā). This pacifies mental disturbances and builds the foundation for insight.\n\n" +
                "**Vipassanā (Insight)**: Practices that develop clear seeing into the true nature of phenomena—their impermanence, unsatisfactoriness, and selflessness. Here, the meditator investigates the Five Aggregates as they arise and pass away, leading to liberating wisdom.\n\n" +
                "Meditation progresses through stages from initial struggle with distraction to deep states of absorption, culminating in direct insight into reality as it is. Regular practice is considered essential for progress on the Buddhist path.",
        keywords: ["meditation", "bhavana", "mindfulness", "samatha", "vipassana", "concentration", "insight meditation", "contemplation", "mental cultivation", "jhana", "anapanasati", "satipatthana"],
        confidence: 0.96,
        related: ["mindfulness", "jhanas", "five hindrances", "four foundations of mindfulness", "breath meditation"],
        source: "Taught extensively in the Pali Canon, particularly in the Satipaṭṭhāna Sutta (MN 10) and Ānāpānasati Sutta (MN 118)",
        usageCount: 0,
        lastUsed: null
      },
      "karma": {
        answer: "Karma (kamma in Pali) means 'action' and refers specifically to volitional actions that have ethical consequences. The Buddha taught that actions motivated by intention (cetanā) create effects that shape our experiences and future circumstances. This operates through natural law rather than divine judgment.\n\n" +
                "Key aspects of the Buddhist understanding of karma include:\n\n" +
                "- **Intentionality**: The ethical quality of actions depends primarily on the intention behind them\n" +
                "- **Multiple Factors**: While karma is important, it's not the only cause of all experiences\n" +
                "- **Workability**: Karma isn't rigid determinism—present choices matter and can change our trajectory\n" +
                "- **Complexity**: The timing and specific manifestation of karmic results can be intricate and not always immediately evident\n\n" +
                "Wholesome actions (based in generosity, kindness, and wisdom) tend toward happiness, while unwholesome actions (based in greed, hatred, and delusion) tend toward suffering. Ultimately, the goal of Buddhist practice is not to create 'good karma' but to end the cycle of karma altogether through liberation.",
        keywords: ["karma", "kamma", "cause and effect", "action", "intention", "moral causation", "ethical causality", "volitional action", "karmic consequences", "karmic seeds", "rebirth"],
        confidence: 0.94,
        related: ["rebirth", "dependent origination", "intention", "ethics", "five precepts"],
        source: "Found throughout the Buddha's teachings, particularly emphasized in the Cullakammavibhaṅga Sutta (MN 135)",
        usageCount: 0,
        lastUsed: null
      },
      "nirvana": {
        answer: "Nibbāna (Sanskrit: Nirvāṇa) is the ultimate goal of Buddhist practice—the complete liberation from suffering and the cycle of rebirth (saṃsāra). It literally means 'blowing out' or 'extinction'—referring to the extinguishing of the fires of greed, hatred, and delusion that fuel suffering.\n\n" +
                "Nibbāna has both negative and positive aspects:\n\n" +
                "- **As Cessation**: The end of craving, attachment, suffering, and the cycle of becoming\n" +
                "- **As Realization**: The unconditioned reality, truth, peace, and highest happiness\n\n" +
                "The Buddha described Nibbāna as:\n" +
                "- Unborn, unbecome, unmade, unconditioned\n" +
                "- The deathless, the secure, the peaceful, the wonderful\n" +
                "- The highest bliss, yet beyond ordinary pleasant feeling\n\n" +
                "While alive, an awakened person (arahant) experiences 'Nibbāna with remainder'—liberation while still having a body subject to pain. At death, they experience 'Nibbāna without remainder' or parinibbāna—complete release from the cycle of existence.",
        keywords: ["nirvana", "nibbana", "enlightenment", "liberation", "awakening", "freedom", "extinction", "cessation", "unconditioned", "parinibbana", "deathless"],
        confidence: 0.91,
        related: ["four noble truths", "arahant", "enlightenment", "samsara", "freedom"],
        source: "Described throughout the Pali Canon, including the Udāna (8.1-4) and numerous suttas",
        usageCount: 0,
        lastUsed: null
      }
    };

    // Save the initial knowledge base
    saveKnowledgeBase();
    showNotification('Default knowledge base initialized');
  }

  // Save knowledge base to localStorage
  function saveKnowledgeBase() {
    localStorage.setItem('buddhistKnowledgeBase', JSON.stringify(state.knowledgeBase));
  }

  // Show notification
  function showNotification(message, type = 'success', duration = 3000) {
    notificationMessage.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide after duration
    setTimeout(() => {
      notification.classList.remove('show');
    }, duration);
  }

  // Load chats from localStorage or initialize if needed
  function loadChats() {
    const savedChats = localStorage.getItem('buddhistChats');
    if (savedChats) {
      state.chats = JSON.parse(savedChats);
      renderChatHistory();
      
      // Check if there's a current chat to load
      const lastChatId = localStorage.getItem('currentChatId');
      if (lastChatId && state.chats[lastChatId]) {
        loadChat(lastChatId);
      } else {
        // Load the most recent chat
        const sortedChats = Object.values(state.chats).sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        if (sortedChats.length > 0) {
          loadChat(sortedChats[0].id);
        } else {
          createNewChat();
        }
      }
    } else {
      createNewChat();
    }
  }

  // Save chats to localStorage
  function saveChats() {
    localStorage.setItem('buddhistChats', JSON.stringify(state.chats));
    if (state.currentChatId) {
      localStorage.setItem('currentChatId', state.currentChatId);
    }
  }

  // Create a new chat
  function createNewChat() {
    const chatId = 'chat_' + Date.now();
    state.chats[chatId] = {
      id: chatId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString()
    };
    
    state.currentChatId = chatId;
    saveChats();
    renderChatHistory();
    loadChat(chatId);
    showNotification('New chat created');
  }

  // Load a specific chat
  function loadChat(chatId) {
    if (!state.chats[chatId]) return;
    
    state.currentChatId = chatId;
    localStorage.setItem('currentChatId', chatId);
    
    chatContainer.innerHTML = '';
    const chat = state.chats[chatId];
    
    // If no messages, show welcome screen
    if (chat.messages.length === 0) {
      chatContainer.innerHTML = `
        <div class="welcome-container">
          <div class="welcome-title">
            <i class="fas fa-dharmachakra"></i> Buddhist Chatbot
          </div>
          <div class="welcome-subtitle">
            Ask questions about Buddhist teachings, philosophy, and practice
          </div>
          
          <div class="suggestions-container">
            <div class="suggestion-card" onclick="suggestQuestion('දස පාරමිතා?')">
              <div class="suggestion-title"            "දස පාරමිතා නම්:",
                "1. දාන පාරමිතාව (පරිත්‍යාගශීලීත්වය)",
                "2. සීල පාරමිතාව (සදාචාරාත්මක හැසිරීම)",
                "3. නෙක්ඛම්ම පාරමිතාව (ලෙෞකික සැප අත්හැරීම)",
                "4. පඤ්ඤා පාරමිතාව (ප්‍රඥාව)",
                "5. විරිය පාරමිතාව (වීර්යය)",
                "6. ඛන්ති පාරමිතාව (ඉවසීම)",
                "7. සච්ච පාරමිතාව (සත්‍යවාදීකම)",
                "8. අධිට්ඨාන පාරමිතාව (අධිෂ්ඨානය)",
                "9. මෙත්තා පාරමිතාව (මෛත්‍රිය)",
                "10. උපෙක්ඛා පාරමිතාව (උපේක්ෂාව)"</div>
              <div class="suggestion-desc">Learn about the Pali Canon's structure</div>
            </div>
            
            <div class="suggestion-card" onclick="suggestQuestion('What is the concept of Anatta?')">
              <div class="suggestion-title">Anatta (Non-self)</div>
              <div class="suggestion-desc">Understand the doctrine of no permanent soul</div>
            </div>
            
            <div class="suggestion-card" onclick="suggestQuestion('Explain the Four Noble Truths')">
              <div class="suggestion-title">Four Noble Truths</div>
              <div class="suggestion-desc">The foundation of Buddhist teaching</div>
            </div>
            
            <div class="suggestion-card" onclick="suggestQuestion('What is Dependent Origination?')">
              <div class="suggestion-title">Dependent Origination</div>
              <div class="suggestion-desc">The chain of cause and effect in Buddhism</div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Render all messages in the chat
      chat.messages.forEach(message => {
        appendMessage(message.sender, message.text, message.related, message.source);
      });
    }
    
    // Update active chat in sidebar
    document.querySelectorAll('.chat-history-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const activeChatElement = document.getElementById(chatId);
    if (activeChatElement) {
      activeChatElement.classList.add('active');
    }
    
    // Close sidebar on mobile after selecting a chat
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
    
    // Scroll to bottom
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 10);
  }

  // Delete a chat
  function deleteChat(chatId) {
    if (state.chats[chatId]) {
      delete state.chats[chatId];
      saveChats();
      renderChatHistory();
      
      // If deleted the current chat, create a new one or load another
      if (chatId === state.currentChatId) {
        const remainingChats = Object.keys(state.chats);
        if (remainingChats.length > 0) {
          loadChat(remainingChats[0]);
        } else {
          createNewChat();
        }
      }
      
      showNotification('Chat deleted', 'success');
    } else {
      showNotification('Chat not found', 'error');
    }
  }

  // Show delete confirmation dialog
  function showDeleteConfirmation(chatId) {
    state.pendingDeleteChatId = chatId;
    confirmDialog.classList.add('active');
  }

  // Render chat history in sidebar
  function renderChatHistory() {
    chatHistory.innerHTML = '';
    
    // Sort chats by creation date (newest first)
    const sortedChats = Object.values(state.chats).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    if (sortedChats.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'empty-message';
      emptyMessage.textContent = 'No chats yet. Start a new conversation!';
      chatHistory.appendChild(emptyMessage);
      return;
    }
    
    sortedChats.forEach(chat => {
      const chatEl = document.createElement('div');
      chatEl.className = 'chat-history-item';
      chatEl.id = chat.id;
      
      if (chat.id === state.currentChatId) {
        chatEl.classList.add('active');
      }
      
      chatEl.innerHTML = `
        <div class="chat-title-text">${chat.title}</div>
        <button class="delete-chat-btn" onclick="event.stopPropagation(); showDeleteConfirmation('${chat.id}')">
          <i class="fas fa-trash"></i>
        </button>
      `;
      
      chatEl.addEventListener('click', () => loadChat(chat.id));
      chatHistory.appendChild(chatEl);
    });
  }

  // Update chat title based on first user message
  function updateChatTitle(message) {
    if (state.chats[state.currentChatId]) {
      const chat = state.chats[state.currentChatId];
      
      // Only update title for the first user message
      if (chat.messages.filter(m => m.sender === 'user').length === 1) {
        // Limit title length
        const title = message.length > 30 ? message.substring(0, 30) + '...' : message;
        chat.title = title;
        saveChats();
        renderChatHistory();
      }
    }
  }

  // Send a message
  function sendMessage() {
    const message = userInput.value.trim();
    if (!message || state.isBotTyping) return;
    
    // Clear input field
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Add user message to UI
    appendMessage('user', message);
    
    // Add message to chat history
    if (state.chats[state.currentChatId]) {
      state.chats[state.currentChatId].messages.push({
        sender: 'user',
        text: message,
        timestamp: new Date().toISOString()
      });
      
      updateChatTitle(message);
      saveChats();
    }
    
    // Start bot typing indicator
    showTypingIndicator();
    
    // Process message and get response (with slight delay for realistic effect)
    setTimeout(() => {
      processUserMessage(message);
    }, 1000 + Math.random() * 1000);
  }

  // Process user message and generate response
  function processUserMessage(message) {
    // Normalize message for matching
    const normalizedMessage = message.toLowerCase();
    
    // Find best matching topic in knowledge base
    let bestMatch = null;
    let highestScore = 0;
    
    Object.entries(state.knowledgeBase).forEach(([topic, data]) => {
      // Check exact topic match
      if (normalizedMessage.includes(topic)) {
        const score = data.confidence;
        if (score > highestScore) {
          highestScore = score;
          bestMatch = data;
        }
      }
      
      // Check keyword matches
      data.keywords.forEach(keyword => {
        if (normalizedMessage.includes(keyword.toLowerCase())) {
          // Adjust score based on keyword specificity
          const score = data.confidence * 0.9;
          if (score > highestScore) {
            highestScore = score;
            bestMatch = data;
          }
        }
      });
    });
    
    // Generate response
    let botResponse, relatedTopics, source;
    
    if (bestMatch && highestScore > 0.5) {
      botResponse = bestMatch.answer;
      relatedTopics = bestMatch.related;
      source = bestMatch.source;
      
      // Update knowledge base usage stats
      bestMatch.usageCount = (bestMatch.usageCount || 0) + 1;
      bestMatch.lastUsed = new Date().toISOString();
      saveKnowledgeBase();
    } else {
      // Generic responses for questions without matches
      botResponse = "I don't have specific information about that topic in my knowledge base. May I suggest asking about core Buddhist concepts like the Four Noble Truths, meditation practices, karma, or the Eightfold Path?";
      relatedTopics = ["four noble truths", "eightfold path", "meditation", "karma", "nirvana"];
      
      // Add to learning queue if not already there
      if (!state.learningQueue.includes(normalizedMessage)) {
        state.learningQueue.push(normalizedMessage);
        showNotification('I will learn more about this topic', 'info');
      }
    }
    
    // Remove typing indicator and add bot response
    removeTypingIndicator();
    appendMessage('bot', botResponse, relatedTopics, source);
    
    // Add bot message to chat history
    if (state.chats[state.currentChatId]) {
      state.chats[state.currentChatId].messages.push({
        sender: 'bot',
        text: botResponse,
        related: relatedTopics,
        source: source,
        timestamp: new Date().toISOString()
      });
      
      saveChats();
    }
  }

  // Append message to chat UI
  function appendMessage(sender, text, relatedTopics, source) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    let messageContent = '';
    
    if (sender === 'user') {
      messageContent = `
        <div class="message-sender">
          <i class="fas fa-user"></i> You
        </div>
        <div class="message-content">${text}</div>
      `;
    } else {
      // Format text with markdown-like styling
      const formattedText = formatBotResponse(text);
      
      messageContent = `
        <div class="message-sender">
          <i class="fas fa-dharmachakra"></i> Buddha Bot
        </div>
        <div class="message-content">
          ${formattedText}
          ${source ? `<div class="citation">Source: ${source}</div>` : ''}
        </div>
      `;
      
      // Add related topics if available
      if (relatedTopics && relatedTopics.length > 0) {
        const relatedContent = `
          <div class="related-topics">
            <div class="related-topics-title">Related Topics</div>
            <div class="related-topic-tags">
              ${relatedTopics.map(topic => `
                <div class="related-topic-tag" onclick="suggestQuestion('Tell me about ${topic}')">
                  ${topic}
                </div>
              `).join('')}
            </div>
          </div>
        `;
        messageContent += relatedContent;
      }
    }
    
    messageDiv.innerHTML = messageContent;
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Format bot response with markdown-like styling
  function formatBotResponse(text) {
    // Convert **bold** to <b>bold</b>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    // Convert *italic* to <i>italic</i>
    formatted = formatted.replace(/\*(.*?)\*/g, '<i>$1</i>');
    
    // Convert line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Convert numbered lists
    formatted = formatted.replace(/(\d+\.\s)/g, '<br>$1');
    
    return formatted;
  }

  // Show typing indicator
  function showTypingIndicator() {
    state.isBotTyping = true;
    sendBtn.disabled = true;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
      <div class="message-sender">
        <i class="fas fa-dharmachakra"></i> Buddha Bot
      </div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    state.isBotTyping = false;
    sendBtn.disabled = false;
    
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Suggest a question (from welcome screen or related topics)
  function suggestQuestion(question) {
    userInput.value = question;
    sendMessage();
  }

  // Auto-resize textarea as user types
  userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    const maxHeight = 150;
    this.style.height = Math.min(this.scrollHeight, maxHeight) + 'px';
  });

  // Send message when Enter key is pressed (unless Shift+Enter)
  userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Toggle sidebar on mobile
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
      sidebar.classList.remove('open');
    }
  });

  // Create new chat
  newChatBtn.addEventListener('click', createNewChat);

  // Confirmation dialog handlers
  cancelDelete.addEventListener('click', function() {
    confirmDialog.classList.remove('active');
    state.pendingDeleteChatId = null;
  });

  confirmDelete.addEventListener('click', function() {
    if (state.pendingDeleteChatId) {
      deleteChat(state.pendingDeleteChatId);
      confirmDialog.classList.remove('active');
      state.pendingDeleteChatId = null;
    }
  });

  // Initialize
  window.onload = function() {
    initializeKnowledgeBase();
    loadChats();
  };

  // Expose functions to global scope for HTML onclick handlers
  window.suggestQuestion = suggestQuestion;
  window.showDeleteConfirmation = showDeleteConfirmation;