import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DragPosition {
  x: number;
  y: number;
}

export interface DragState {
  draggingStickerId: string | null;
  position: DragPosition | null;
  dropZoneId: string | null;
  isValidDrop: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StickerDragFacadeService {
  
  private dragStateSubject = new BehaviorSubject<DragState>({
    draggingStickerId: null,
    position: null,
    dropZoneId: null,
    isValidDrop: false,
  });

  dragState$: Observable<DragState> = this.dragStateSubject.asObservable();

  constructor(
    // injecter ici d'autres services utiles, ex: ZoneService, BackendService, etc.
  ) {}

  startDrag(stickerId: string, initialPosition: DragPosition) {
    this.dragStateSubject.next({
      draggingStickerId: stickerId,
      position: initialPosition,
      dropZoneId: null,
      isValidDrop: false,
    });
  }

  moveDrag(newPosition: DragPosition) {
    const currentState = this.dragStateSubject.getValue();

    if (!currentState.draggingStickerId) return; // pas de drag en cours

    // TODO: calculer la zone cible à partir de newPosition, valider la drop zone
    const dropZoneId = this.calculateDropZone(newPosition);
    const isValidDrop = dropZoneId !== null && this.isZoneFree(dropZoneId);

    this.dragStateSubject.next({
      draggingStickerId: currentState.draggingStickerId,
      position: newPosition,
      dropZoneId,
      isValidDrop,
    });
  }

  endDrag(finalPosition: DragPosition) {
    const currentState = this.dragStateSubject.getValue();

    if (!currentState.draggingStickerId) return;

    if (currentState.isValidDrop && currentState.dropZoneId) {
      // TODO: placer le sticker dans la zone (mettre à jour l’état, appeler backend, etc.)
      this.placeStickerInZone(currentState.draggingStickerId, currentState.dropZoneId);
    } else {
      // TODO: remettre le sticker à sa position d’origine (spawn)
      this.resetStickerPosition(currentState.draggingStickerId);
    }

    this.dragStateSubject.next({
      draggingStickerId: null,
      position: null,
      dropZoneId: null,
      isValidDrop: false,
    });
  }

  cancelDrag() {
    const currentState = this.dragStateSubject.getValue();
    if (!currentState.draggingStickerId) return;

    this.resetStickerPosition(currentState.draggingStickerId);

    this.dragStateSubject.next({
      draggingStickerId: null,
      position: null,
      dropZoneId: null,
      isValidDrop: false,
    });
  }

  private calculateDropZone(position: DragPosition): string | null {
    // TODO: logique collision, detection zone
    return null;
  }

  private isZoneFree(zoneId: string): boolean {
    // TODO: vérifier si la zone est déjà occupée
    return true;
  }

  private placeStickerInZone(stickerId: string, zoneId: string) {
    // TODO: update local state et backend
  }

  private resetStickerPosition(stickerId: string) {
    // TODO: remettre le sticker à son spawn
  }
}