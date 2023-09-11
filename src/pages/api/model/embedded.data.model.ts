interface Item {
    name: string;
    path: string;
    contentType: string;
    submoduleUrl?: string;
    submoduleDisplayName?: string;
  }
  
  interface FileTree {
    [key: string]: {
      items: Item[];
      totalCount: number;
    };
  }
  
  interface Repo {
    id: number;
    defaultBranch: string;
    name: string;
    ownerLogin: string;
    currentUserCanPush: boolean;
    isFork: boolean;
    isEmpty: boolean;
    createdAt: string;
    ownerAvatar: string;
    public: boolean;
    private: boolean;
    isOrgOwned: boolean;
  }
  
  interface RefInfo {
    name: string;
    listCacheKey: string;
    canEdit: boolean;
    refType: string;
    currentOid: string;
  }
  
  interface BBlob {
    rawLines: string[];
    stylingDirectives: any[];
  }
  
  interface DependabotInfo {
    showConfigurationBanner: boolean;
    configFilePath: any;
    networkDependabotPath: string;
    dismissConfigurationNoticePath: string;
    configurationNoticeDismissed: any;
    repoAlertsPath: string;
    repoSecurityAndAnalysisPath: string;
    repoOwnerIsOrg: boolean;
    currentUserCanAdminRepo: boolean;
  }
  
  interface HeaderInfo {
    blobSize: string;
    deleteInfo: any;
    editInfo: any;
    ghDesktopPath: any;
    gitLfsPath: any;
    onBranch: boolean;
    shortPath: string;
    siteNavLoginPath: string;
    isCSV: boolean;
    isRichtext: boolean;
    toc: any;
    lineInfo: {
      truncatedLoc: string;
      truncatedSloc: string;
    };
    mode: string;
  }
  
  interface File {
    displayName: string;
    displayUrl: string;
    headerInfo: HeaderInfo;
  }
  
  interface Payload {
    allShortcutsEnabled: boolean;
    fileTree: FileTree;
    fileTreeProcessingTime: number;
    foldersToFetch: any[];
    reducedMotionEnabled: any;
    repo: Repo;
    symbolsExpanded: boolean;
    treeExpanded: boolean;
    refInfo: RefInfo;
    path: string;
    currentUser: any;
    blob: BBlob;
  }
  
  interface CSRFToken {
    post: string;
  }
 
  interface EmbeddedData {
    title: string;
    payload: Payload;
  }
  