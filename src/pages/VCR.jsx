import React from 'react'
import VCR from "../components/VCR/Index"
import {useTitle} from "../hooks/useTitle"

const title = "VCR - Visual Commonsense Reasoning"

export default function VCRPage() {
    useTitle(title)
  return (
      <VCR /> 
  )
}
